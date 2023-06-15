# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::UsersController, type: :controller do
  let!(:user) { FactoryBot.create(:user) } # Create a user for testing

  let!(:new_user) {
    {
      "user_id" => '062375781IBM',
      "name" => 'test',
      "lastName" => 'test',
      "email" => 'test@ibm.com',
      "password" => '123456',
      "password_confirmation" => '123456',
      "active" => true,
      "user_type" => 2,
      "city" => 'Bogota',
      "state" => 'Cundinamarca',
      "country" => 'Colombia',
      "department" => 'IT'
    }
  }


  before { subject }

  describe 'GET #index' do
    it 'returns json aunthentication error' do
      get :index
      expect(response).to have_http_status(:unauthorized)
    end

    it 'returns json with all users' do
      request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
      get :index
      expect(response).to have_http_status(:ok)
    end

    it 'returns json authentication error' do
      get :index
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'GET #show' do
    it 'returns json aunthentication error' do
      get :show, params: { id: '063375781IBM' }
      expect(response).to have_http_status(:unauthorized)
    end

    it 'returns json with user' do
      request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
      get :show, params: { id: '063375781IBM' }
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST #create' do
    it 'returns status code 200' do
      post :create, params: { user: new_user }
      expect(response).to have_http_status(:ok)
    end

    it 'returns json with user' do
      post :create, params: { user: new_user }
      expect(response.body).to include('user')
    end

    it 'returns json with jwt' do
      post :create, params: { user: new_user }
      expect(response.body).to include('jwt')
    end

    it 'returns json with error' do
      error_user = new_user.clone
      error_user['password_confirmation'] = '1234567'
      post :create, params: { user: error_user }
      expect(response.body).to include('error')
    end
  end

  describe 'PUT #update' do
    it 'returns json aunthentication error' do
      put :update, params: { id: '063375781IBM', user: new_user }
      expect(response).to have_http_status(:unauthorized)
    end

    it 'returns json with user' do
      request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
      put :update, params: { id: '063375781IBM', user: new_user }
      expect(response).to have_http_status(:ok)
    end

    it 'returns json with error' do
      request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
      error_user = new_user.clone
      error_user['password_confirmation'] = '1234567'
      put :update, params: { id: '063375781IBM', user: error_user }
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
