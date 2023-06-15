# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Sso::SessionsController, type: :controller do
    let!(:user) { FactoryBot.create(:user) } # Create a user for testing

    describe 'POST #create' do
        it 'returns status code 200' do
            post :create, params: { session: { email: 'examplemail@gmail.com', password: 'password' } }
            expect(response).to have_http_status(:ok)
        end

        it 'returns status code 401' do
            post :create, params: { session: { email: 'examplemail@gmail.com', password: 'wrongpassword' } }
            expect(response).to have_http_status(:bad_request)
        end

        it 'returns json data with user email correctly' do
            post :create, params: { session: { email: 'examplemail@gmail.com', password: 'password' } }
            json_response = JSON.parse(response.body)
            expect(json_response['user']['email']).to eq('examplemail@gmail.com')
        end

        it 'returns json data with user id correctly' do
            post :create, params: { session: { email: 'examplemail@gmail.com', password: 'password' } }
            json_response = JSON.parse(response.body)
            expect(json_response['user']['user_id']).to eq(user.user_id)
        end
    end

    describe 'GET #show' do
        it 'returns status code 200' do
            post :create, params: { session: { email: 'examplemail@gmail.com', password: 'password' } }
            json_response = JSON.parse(response.body)
            request.headers['Authorization'] = json_response['jwt']
            get :show
            expect(response).to have_http_status(:ok)
        end

        it 'returns status code 401' do
            get :show
            expect(response).to have_http_status(:unauthorized)
        end
    end
end