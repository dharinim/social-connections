User.delete_all

User.connection.execute('ALTER SEQUENCE users_id_seq RESTART WITH 1')

fake_users = []
(0..50).each
  fake_users << {name: Faker::Name.name, linkedin_connections: rand(100), facebook_connections: rand(100), twitter_followers: rand(100)}
end

seed_data = {
  users: fake_users
}

def calculate_index(new_user)
  social_network_count = new_user.linkedin_connections + new_user.facebook_connections + new_user.twitter_followers
  case social_network_count 
    when 0..50
      then index = 1
    when 51..100
      then index = 1.5
    when 101..200
      then index = 5
    when 201..400
      then index = 10
    when social_network_count > 401
      then index = 15
  end
  return index
end

def seed_dataset(data, model)
  for row in data
    new_user = model.create!(row)
    new_user.update(social_connection_index: calculate_index(new_user))
  end
end

seed_dataset(seed_data[:users], User)