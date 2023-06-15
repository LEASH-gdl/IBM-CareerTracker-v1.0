class ApplicationController < ActionController::API

    def jwt_key
        ENV["JWT_KEY"]
    end 

    def issue_token(user, expiration = 24.hours.from_now.to_i)
        payload = {user_id: user.user_id, exp: expiration}
        JWT.encode(payload, jwt_key, "HS256")
    end

    def decoded_token
        begin
            JWT.decode(token, jwt_key, true, {algorithm: "HS256"})
        rescue JWT::DecodeError
            [{}]
        end  
    end
    
    def token
        request.headers["Authorization"]
    end

    def user_id
        decoded_token.first["user_id"]
    end

    def current_user
        user ||= User.find_by(user_id: user_id)
    end

    def logged_in?
        !!current_user
    end
end
