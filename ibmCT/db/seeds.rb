# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Create a main sample user.
unless User.exists?(user_id: "073296781IBM")
  User.create!(user_id: "073296781IBM",
                name: "Anika",
                lastName: "Brooks",
                email: "anika_brooks@ibm.com",
                password: "$2a$10$CwTycUXWue0Thq9StjUM0ugTY2ciiAhdxflTMdC2Vmp8MF7vzggm2",
                password_confirmation: "$2a$10$CwTycUXWue0Thq9StjUM0ugTY2ciiAhdxflTMdC2Vmp8MF7vzggm2",
                active: true,
                user_type: 1,
                city: "Guadalajara",
                state: "Jalisco",
                country: "Mexico",
                department: "Finance and Operation"
               )
end

unless User.exists?(user_id: "070482781IBM")
    User.create!(user_id: "070482781IBM",
                  name: "Donell",
                  lastName: "Roberts",
                  email: "donnell_roberts@ibm.com",
                  password: "$2a$10$CwTycUXWue0Thq9StjUM0ugTY2ciiAhdxflTMdC2Vmp8MF7vzggm2",
                  password_confirmation: "$2a$10$CwTycUXWue0Thq9StjUM0ugTY2ciiAhdxflTMdC2Vmp8MF7vzggm2",
                  active: true,
                  user_type: 2,
                  city: "Guadalajara",
                  state: "Jalisco",
                  country: "Mexico",
                  department: "Human Resources"
                 )
  end



