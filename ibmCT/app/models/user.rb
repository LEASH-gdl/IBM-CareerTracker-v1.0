class User < ApplicationRecord
    has_many :certifications

    has_secure_password
end
