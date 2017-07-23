class UsersController < ApplicationController

  def index
    
  end
  
  def user_details
    users = User.all

    response = {
      users: users
    }
    p response[:users]
    respond_to do |format|
      format.json  { render :json => response }
    end
  end

end
