Rails.application.routes.draw do

  namespace :v1 do
    resources :users, except: [:destroy]
    resources :certifications
    post "/signup", to: "users#create"
    post '/upload', to: 'uploads#upload_file'
  end

  namespace :sso do
    post "/login", to: "sessions#create"
    get "/authorized", to: "sessions#show"
  end
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
