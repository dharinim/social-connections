class UsersController < ApplicationController
  include UsersHelper
  skip_before_action :verify_authenticity_token

  def index
    sort_field = params["sort_field"] || :social_connection_index
    sort_order = params["sort_order"] || :desc
    page = params["page"] || 1
    limit = params["limit"] || 10
    searchTerm = params["searchTerm"] || ""

    offset = (page.to_i - 1) * limit.to_i

    users = User.all.order(sort_field => sort_order).
                                        where(User.arel_table[:name].matches("%#{searchTerm}%"))

    total = users.count
    users = users.offset(offset).limit(limit)

    response = {
      users: users,
      page: page,
      total: total,
      limit: limit
    }

    respond_to do |format|
      format.json  { render :json => response }
    end
  end
  
  def create
    p params
    # social_connection_index = find_social_connection_index(params["linkedin_connections"].to_i, params["facebook_connections"].to_i, params["twitter_followers"].to_i))
    newuser = User.create(name: params["name"], 
              linkedin_connections: params["linkedin_connections"].to_i,
              facebook_connections: params["facebook_connections"].to_i, 
              twitter_followers: params["twitter_followers"].to_i,
              social_connection_index: find_social_connection_index(params["linkedin_connections"].to_i, params["facebook_connections"].to_i, params["twitter_followers"].to_i))
  end

  def update
      user = User.find(params["id"].to_i)
      user.update(id: params["id"].to_i,
                  name: params["name"], 
                  linkedin_connections: params["linkedin_connections"].to_i, 
                  facebook_connections: params["facebook_connections"].to_i, 
                  twitter_followers: params["twitter_followers"].to_i,
                  social_connection_index: find_social_connection_index(params["linkedin_connections"].to_i, params["facebook_connections"].to_i, params["twitter_followers"].to_i))
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

  def sort
    p params
    sort_order = params["order"].to_sym
    p sort_order
    users = User.all.order(sort_order).reverse
    response = {
      users: users
    }
    # p response[:users]
    respond_to do |format|
      format.json  { render :json => response }
    end
  end

end
