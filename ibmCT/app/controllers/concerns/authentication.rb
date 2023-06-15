module Authentication
    def authenticate_user
        if logged_in?
            status = 200
        else
            render json: {error: "User is not logged in/could not be found."}, status: 401
        end
    end
end