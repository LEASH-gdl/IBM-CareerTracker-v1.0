# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
    let!(:user) { FactoryBot.create(:user) } # Create a user for testing
    let!(:headers) { { "Authorization" => "#{ApplicationController.new.issue_token(user)}" } }

    describe 'jwt_key' do
        it 'returns a string' do
            expect(ApplicationController.new.jwt_key).to be_a(String)
        end

        it 'returns ENV["JWT_KEY"]' do
            expect(ApplicationController.new.jwt_key).to eq(ENV["JWT_KEY"])
        end
    end

    describe 'issue_token' do
        it 'returns a token' do
            expect(ApplicationController.new.issue_token(user)).to be_a(String)
        end
    end

    describe 'decoded_token' do
        it 'returns an array' do
            request = double(headers: headers)
            allow(controller).to receive(:request).and_return(request)
            expect(controller.decoded_token).to be_a(Array)
        end
    end

    describe 'token' do
        it 'returns a string' do
            request = double(headers: headers)
            allow(controller).to receive(:request).and_return(request)
            expect(controller.token).to be_a(String)
        end
    end

    describe 'user_id' do
        it 'returns a string' do
            request = double(headers: headers)
            allow(controller).to receive(:request).and_return(request)
            expect(controller.user_id).to be_a(String)
        end

        it 'returns the user_id from the token' do
            request = double(headers: headers)
            allow(controller).to receive(:request).and_return(request)
            expect(controller.user_id).to eq(user.user_id)
        end
    end

    describe 'current_user' do
        it 'returns a user' do
            request = double(headers: headers)
            allow(controller).to receive(:request).and_return(request)
            expect(controller.current_user).to be_a(User)
        end

        it 'returns the user from the token' do
            request = double(headers: headers)
            allow(controller).to receive(:request).and_return(request)
            expect(controller.current_user).to eq(user)
        end
    end

    describe 'logged_in?' do
        it 'returns true if there is a current_user' do
            request = double(headers: headers)
            allow(controller).to receive(:request).and_return(request)
            expect(controller.logged_in?).to eq(true)
        end

        it 'returns false if there is no current_user' do
            request = double(headers: {})
            allow(controller).to receive(:request).and_return(request)
            expect(controller.logged_in?).to eq(false)
        end
    end
end