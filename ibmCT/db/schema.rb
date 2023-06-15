# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_19_221428) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "certifications", force: :cascade do |t|
    t.string "user_id", null: false
    t.date "issue_date"
    t.text "cert_name"
    t.string "cert_type"
    t.text "cert_categ"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", primary_key: "user_id", id: :string, force: :cascade do |t|
    t.string "name"
    t.string "lastName"
    t.string "email"
    t.string "password_digest", null: false
    t.boolean "active"
    t.integer "user_type"
    t.string "city"
    t.string "state"
    t.string "country"
    t.text "department"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
