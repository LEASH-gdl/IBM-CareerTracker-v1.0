class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: false do |t|
      t.string :user_id, null: false, primary_key: true
      t.string :name
      t.string :lastName
      t.string :email
      t.string :password_digest, null: false
      t.boolean :active
      t.integer :user_type
      t.string :city
      t.string :state
      t.string :country
      t.text :department

      t.timestamps
    end
  end
end
