User.delete_all

User.connection.execute('ALTER SEQUENCE users_id_seq RESTART WITH 1')

fake_users = []
for i in 0..50
  fake_users << {name: Faker::Name.name, linkedin_connections: rand(1000), facebook_connections: rand(1000), twitter_followers: rand(1000)}
end

seed_data = {
  users: fake_users
}

def seed_dataset(data, model)
  for row in data
    new_user = model.create!(row)
    new_user.update(social_connection_index: User.compute_social_connection(
      new_user.linkedin_connections,
      new_user.facebook_connections,
      new_user.twitter_followers
    ))
  end
end

seed_dataset(seed_data[:users], User)