module UsersHelper
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
