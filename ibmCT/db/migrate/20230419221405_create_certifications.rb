class CreateCertifications < ActiveRecord::Migration[7.0]
  def change
    create_table :certifications do |t|
      t.string :user_id, null: false, foreign_key: true
      t.date :issue_date
      t.text :cert_name
      t.string :cert_type
      t.text :cert_categ

      t.timestamps
    end
  end
end
