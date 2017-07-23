class UsersController < ApplicationController

  def index
    
  end
  
  def user_details
    users = User.all.order(:social_connection_index).reverse
    # Item.order('item_timestamp DESC NULLS LAST').paginate(:page => params[:page], :per_page => 5)

    response = {
      users: users
    }
    p response[:users]
    respond_to do |format|
      format.json  { render :json => response }
    end
  end

end
