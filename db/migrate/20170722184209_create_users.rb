class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.integer :linkedin_connections
      t.integer :facebook_connections
      t.integer :twitter_followers
      t.integer :social_connection_index
      t.timestamps
    end
  end
end
