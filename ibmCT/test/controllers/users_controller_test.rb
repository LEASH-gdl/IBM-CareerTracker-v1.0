require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url, as: :json
    assert_response :success
  end

  test "should create user" do
    assert_difference("User.count") do
      post users_url, params: { user: { active: @user.active, city: @user.city, country: @user.country, department: @user.department, email: @user.email, id: @user.id, lastName: @user.lastName, name: @user.name, password: @user.password, state: @user.state, user_type: @user.user_type } }, as: :json
    end

    assert_response :created
  end

  test "should show user" do
    get user_url(@user), as: :json
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: { user: { active: @user.active, city: @user.city, country: @user.country, department: @user.department, email: @user.email, id: @user.id, lastName: @user.lastName, name: @user.name, password: @user.password, state: @user.state, user_type: @user.user_type } }, as: :json
    assert_response :success
  end

  test "should destroy user" do
    assert_difference("User.count", -1) do
      delete user_url(@user), as: :json
    end

    assert_response :no_content
  end
end
