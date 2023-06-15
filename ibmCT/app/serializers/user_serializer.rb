class UserSerializer < ActiveModel::Serializer
  attributes :user_id, :email, :name, :lastName, :password_digest, :active, :user_type, :city, :state, :country, :department, :created_at, :updated_at
end
