# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::UploadsController, type: :controller do
    let!(:user) { FactoryBot.create(:user) } # Create a user for testing

    describe 'POST #upload_file' do
        it 'returns status code 200' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            post :upload_file, params: { file: fixture_file_upload('upload_file.json', 'application/json') }
            expect(response).to have_http_status(:ok)
        end

        it 'returns status code 400 if file is not a json' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            post :upload_file, params: { file: fixture_file_upload('upload_file.txt', 'text/plain') }
            expect(response).to have_http_status(:bad_request)
        end

        it 'returns status json error if file is not a json' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            post :upload_file, params: { file: fixture_file_upload('upload_file.txt', 'text/plain') }
            expect(JSON.parse(response.body)["error"]).to eq("File is not a compatible file")
        end

        it 'returns status code 400 if file is nil' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            post :upload_file
            expect(response).to have_http_status(:bad_request)
        end

        it 'returns status json error if file is nil' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            post :upload_file
            expect(JSON.parse(response.body)["error"]).to eq("No file was uploaded")
        end

        it 'returns status code 400 if there is a certification without user_id' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            post :upload_file, params: { file: fixture_file_upload('upload_file_without_user_id.json', 'application/json') }
            expect(response).to have_http_status(:bad_request)
        end

        it 'returns status json error if there is a certification without user_id' do
            request.headers['Authorization'] = "#{ApplicationController.new.issue_token(user)}"
            post :upload_file, params: { file: fixture_file_upload('upload_file_without_user_id.json', 'application/json') }
            expect(JSON.parse(response.body)["error"]).to eq("There is a certification without user_id")
        end
    end

end