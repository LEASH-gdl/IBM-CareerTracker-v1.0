# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::CertificationsController, type: :controller do
    let!(:user) { FactoryBot.create(:user) } # Create a user for testing
    let!(:certification) { FactoryBot.create(:certification) } # Create a certification for testing

    let!(:new_certification) {
        {
            "user_id" => "063375781IBM",
            "issue_date" => "2021-04-19",
            "cert_name" => "IBM Cloud Pak for Integration v2020.4 Solution Architect",
            "cert_type" => "IBM Cloud",
            "cert_categ" => "Cloud"
        }
    }

    describe 'GET #index' do
        it 'returns status code 200' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            get :index
            expect(response).to have_http_status(:ok)
        end
        
        it 'returns json with the certifications' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            get :index
            json_response = JSON.parse(response.body)
            expect(json_response[0]['user_id']).to eq(certification.user_id)
        end
    end 

    describe 'GET #show' do
        it 'returns status code 200' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            get :show, params: { id: user.user_id }
            expect(response).to have_http_status(:ok)
        end

        it 'returns json with the certification' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            get :show, params: { id: user.user_id }
            json_response = JSON.parse(response.body)
            expect(json_response[0]['user_id']).to eq(certification.user_id)
        end

        it 'returns status code 404 if certification not found' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            get :show, params: { id: "000000000IBM" }
            expect(response).to have_http_status(:not_found)
        end
    end

    describe 'POST #create' do
        it 'returns status code 201' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            post :create, params: { certification: new_certification}
            expect(response).to have_http_status(:created)
        end

        it 'returns json with the new certification' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            post :create, params: { certification: new_certification}
            json_response = JSON.parse(response.body)
            expect(json_response['user_id']).to eq(new_certification['user_id'])
        end

        it 'returns status code 422' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            new_certification['user_id'] = nil
            post :create, params: { certification: new_certification}
            expect(response).to have_http_status(:unprocessable_entity)
        end
    end

    describe 'PUT #update' do
        it 'returns status code 200' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            new_certification['cert_name'] = "IBM 2021"
            put :update, params: { id: certification.id, certification: new_certification}
            expect(response).to have_http_status(:ok)
        end

        it 'returns json with the updated certification' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            new_certification['cert_name'] = "IBM 2021"
            put :update, params: { id: certification.id, certification: new_certification}
            json_response = JSON.parse(response.body)
            expect(json_response['cert_name']).to eq(new_certification['cert_name'])
        end

        it 'returns status code 422 if user_id is nil' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            new_certification['user_id'] = nil
            put :update, params: { id: certification.id, certification: new_certification}
            expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns status code 422 if new user_id does not exist' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            new_certification['user_id'] = "000000000IBM"
            put :update, params: { id: certification.id, certification: new_certification}
            expect(response).to have_http_status(:unprocessable_entity)
        end
    end

    describe 'DELETE #destroy' do
        it 'returns status code 204' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            delete :destroy, params: { id: certification.id }
            expect(response).to have_http_status(:no_content)
        end
    end
end