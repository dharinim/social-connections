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


  def validate_id
    id = params["id"]
    error_in_validation = false

    if (id == nil)
      error_in_validation = true
    end

    if (id.to_i == 0)
      error_in_validation = true
    end

    if error_in_validation
      response = {
        code: "validation_error",
        message: "Need parameter id to edit user"
      }

      return respond_to do |format|
        format.json {render :json => response, :status => 400}
      end
    end
  end

  def validate_social_counts
      ["linkedin_connections", "facebook_connections", "twitter_followers"].each do |item|
        item = params[item]
        data = item.match(/[0-9]+/)
        if data != nil && data[0].length == item.length
          # validates to a integer
        else 
            response = {
              code: "validation_error",
              message: "value #{item} is not a valid number"
            }

            return respond_to do |format|
              format.json {render :json => response, :status => 400}
            end
        end
      end
  end

end
