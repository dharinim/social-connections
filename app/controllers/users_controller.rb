class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    
  end
  
  def user_details
    users = User.all.order(:social_connection_index).reverse
    # Item.order('item_timestamp DESC NULLS LAST').paginate(:page => params[:page], :per_page => 5)

    response = {
      users: users
    }
    # p response[:users]
    respond_to do |format|
      format.json  { render :json => response }
    end
  end
  
  def edit
    p "i m in edit"
    p params["id"]
      user = User.find(params["id"].to_i)
      p user
      user.update(id: params["id"].to_i,
                  name: params["name"], 
                  linkedin_connections: params["linkedin_connections"].to_i, 
                  facebook_connections: params["facebook_connections"].to_i, 
                  twitter_followers: params["twitter_followers"].to_i,
                  social_connection_index: params["social_connection_index"].to_i)
  end
end
