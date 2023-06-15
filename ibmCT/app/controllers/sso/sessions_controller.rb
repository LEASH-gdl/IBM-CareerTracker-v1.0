class Sso::SessionsController < ApplicationController

    include Authentication # Concerns::Authentication

    def create
        @user = User.find_by_email(session_params[:email])

        if @user && @user.authenticate(session_params[:password])
            @token = issue_token(@user)
            render :json => {user: UserSerializer.new(@user), jwt: @token}, :status => :ok
        else
            render :status => :bad_request
        end
    end

    def show
        if logged_in?
            render :json => {user: UserSerializer.new(current_user)}, :status => :ok
        else
            render :json => {error: "User is not logged in/could not be found."}, :status => :unauthorized
        end
    end

    private
        def session_params
            params.require(:session).permit(:email, :password)
        end
end
