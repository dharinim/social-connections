class UsersController < ApplicationController
  include UsersHelper
  
  before_action :validate_id, :only => :update
  before_action :validate_social_counts, :only => [:create, :update]

  def index
    sort_field = params["sort_field"] || :social_connection_index
    sort_order = params["sort_order"] || :desc
    page = params["page"] || 1
    limit = params["limit"] || 10
    searchTerm = params["searchTerm"] || ""

    limit = limit.to_i
    offset = (page.to_i - 1) * limit

    users = User.all.order(sort_field => sort_order, :id => "desc").
                                        where(User.arel_table[:name].matches("%#{searchTerm}%"))

    total = users.count
    users = users.offset(offset).limit(limit)
    users = users.select(User.column_names - ["created_at", "updated_at"])

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
      name = params["name"]
      linkedin_connections = params["linkedin_connections"].to_i
      facebook_connections = params["facebook_connections"].to_i
      twitter_followers = params["twitter_followers"].to_i


    newuser = User.create(
                name: name, 
                linkedin_connections: linkedin_connections,
                facebook_connections: facebook_connections, 
                twitter_followers: twitter_followers,
                social_connection_index: find_social_connection_index(
                    linkedin_connections,
                    facebook_connections,
                    twitter_followers
                )
              )
  end

  def update
      id = params["id"].to_i
      name = params["name"]
      linkedin_connections = params["linkedin_connections"].to_i
      facebook_connections = params["facebook_connections"].to_i
      twitter_followers = params["twitter_followers"].to_i

      user = User.find(id)
      user.update(
        id: id,
        name: name, 
        linkedin_connections: linkedin_connections, 
        facebook_connections: facebook_connections, 
        twitter_followers: twitter_followers,
        social_connection_index: find_social_connection_index(
          linkedin_connections,
          facebook_connections,
          twitter_followers
        )
      )
  end
end
