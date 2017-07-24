class User < ApplicationRecord
  def compute_social_connection(linkedin_connections, facebook_connections, twitter_followers)
    self.compute_social_connection(linkedin_connections, facebook_connections, twitter_followers)
  end

  def self.compute_social_connection(linkedin_connections, facebook_connections, twitter_followers)
    calculate_per_social_index(linkedin_connections) +
    calculate_per_social_index(facebook_connections) +
    calculate_per_social_index(twitter_followers)
  end

  def self.calculate_per_social_index(connections)
    case connections 
      when 0..50
        then index = 1
      when 51..100
        then index = 1.5
      when 101..200
        then index = 5
      when 201..400
        then index = 10
      else
        index = 15
    end
    return index
  end
end
