class UsersController < ApplicationController
  include UsersHelper
  
  before_action :validate_id, :only => :update
  before_action :validate_social_counts, :only => [:create, :update]

  # Returns all users after matching
  # and filtering with the filtering parameters
  # @param sort_field [String] specifies the field to sort on
  # @param sort_order [String] either "asc" or "desc"
  # @param page [Integer] the page number to display for pagination
  # @param limit [Integer] limits the results by the given number
  # @param searchTerm [String] search term for filtering on name field

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
  
  # Create a new user object
  # @param name [String] specifies the name of the user
  # @param linkedin_connections [Integer] specifies the count of linkedin_connections
  # @param facebook_connections [Integer] specifies the count of facebook_connections
  # @param twitter_followers [String] specifies the count of twitter_followers
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
                social_connection_index: User.compute_social_connection(
                    linkedin_connections,
                    facebook_connections,
                    twitter_followers
                )
              )
  end

  # Update a user object
  # @param id [Integer] specifies the user id to edit
  # @param name [String] specifies the name of the user
  # @param linkedin_connections [Integer] specifies the count of linkedin_connections
  # @param facebook_connections [Integer] specifies the count of facebook_connections
  # @param twitter_followers [String] specifies the count of twitter_followers
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
        social_connection_index: User.compute_social_connection(
          linkedin_connections,
          facebook_connections,
          twitter_followers
        )
      )
  end
end
