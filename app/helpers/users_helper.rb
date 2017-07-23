module UsersHelper

  def find_social_connection_index(linkedin_connections, facebook_connections, twitter_followers)
    social_network_count = linkedin_connections + facebook_connections + twitter_followers
    case social_network_count 
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
