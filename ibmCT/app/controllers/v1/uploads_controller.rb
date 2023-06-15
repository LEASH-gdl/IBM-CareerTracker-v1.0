class V1::UploadsController < ApplicationController
    before_action :authenticate

    include Authentication

    def upload_file
        uploaded_file = params[:file]

        if uploaded_file.nil?
            render json: { error: "No file was uploaded" }, status: :bad_request
            return
        end

        file_contents = uploaded_file.read

        user_to_insert = []
        certification_to_insert = []
        user_id_list = []
        i = 1

        begin
            parsed_data = JSON.parse(file_contents)  
            
            parsed_data.map do |data|
                if data["user_id"].nil?
                    render json: { error: "There is a certification without user_id" }, status: :bad_request
                    return
                end

                unless user_id_list.include?(data["user_id"])
                    user = User.new(default_user)
                    user_attributes.map do |attribute|
                        if !data[attribute].nil?
                            user[attribute] = data[attribute]
                        end
                    end
                    user_id_list.push(user.user_id)
                    user_to_insert.push(user)
                end

                certification = Certification.new
                certification_attributes.map do |attribute|
                    if !data[attribute].nil?
                        certification[attribute] = data[attribute]
                    end
                end
                certification_to_insert.push(certification)
            end

            User.import user_to_insert, on_duplicate_key_ignore: true
            Certification.import certification_to_insert, on_duplicate_key_update: certification_attributes

            render json: { message: "File uploaded successfully" }, status: :ok
        rescue JSON::ParserError => e
            render json: { error: "File is not a compatible file" }, status: :bad_request
            return
        end
    end

    def authenticate
        authenticate_user
    end

    private 

    def user_attributes
        return ['user_id', 'name', 'lastName', 'email', 'password', 'password_confirmation', 'active', 'user_type', 'city', 'state', 'country', 'department']
    end

    def certification_attributes
        return ['user_id', 'issue_date', 'cert_name', 'cert_type', 'cert_categ']
    end

    def default_user
        return {
            user_id: "",
            name: "",
            lastName: "",
            email: "",
            password: ENV["DEFAULT_PASSWORD"],
            password_confirmation: ENV["DEFAULT_PASSWORD"],
            active: false,
            user_type: 1,
            city: "",
            state: "",
            country: "",
            department: ""
        }
    end
end
