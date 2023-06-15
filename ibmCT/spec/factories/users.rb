FactoryBot.define do
    factory :user do
        user_id { "063375781IBM" }
        name { "Pedro" }
        lastName { "Solano" }
        email { "examplemail@gmail.com" }
        password { "password" }
        password_confirmation { "password" }
        active { true }
        user_type { 1 }
        city { "Guadalajara" }
        state { "Jalisco" }
        country { "Mexico" }
        department { "Finance and Operation" }
    end
end