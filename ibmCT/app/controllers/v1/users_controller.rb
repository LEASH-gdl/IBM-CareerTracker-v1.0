class V1::UsersController < ApplicationController
  before_action :set_user, only: %i[ show update ]

  before_action :authenticate , only: [:show, :update, :index]

  include Authentication

  # GET /users
  def index
    @users = User.all
    render json: @users.map{|user| user.attributes.except("password_digest", "created_at", "updated_at")}, status: :ok
  end

  # GET /users/id
  def show
    render json: @user.attributes.except("password_digest", "created_at", "updated_at"), status: :ok
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      @token = issue_token(@user)
      render json: {user: UserSerializer.new(@user), jwt: @token}
    else
      if @user.errors.messages
        render json: {error: @user.errors.messages}
      else
        render json: {error: "User could not be created. Try again"}
      end
    end
  end

  def authenticate
    authenticate_user
  end

  # PATCH/PUT /users/:id
  def update
    if @user.update(user_params)
      render json: @user.attributes.except("password_digest", "created_at", "updated_at")
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:user_id, :name, :lastName, :email, :password, :password_confirmation, :active, :user_type, :city, :state, :country, :department)
      # change password_digest to password and add password_confirmation
    end
end
