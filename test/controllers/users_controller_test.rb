require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest

  test "get a list of users without special filtering" do
    create(:user, {:id => 1, :linkedin_connections => 5, :facebook_connections => 6, :twitter_followers => 300})

    get "/users/?sort_order=desc&limit=1", as: :json

    expectedRepsonse = {
      "users" => [{"id"=>1, "name"=>"user1", "linkedin_connections"=>5, "facebook_connections"=>6, "twitter_followers"=>300, "social_connection_index"=>12}],
      "page" => 1
    }

    r = JSON.parse(response.body)
    assert_equal 200, response.status
    assert_equal expectedRepsonse["users"], r["users"]
  end

  test "get a list of users with paginations for page 3" do
    create(:user, {:id => 1, :linkedin_connections => 5, :facebook_connections => 6, :twitter_followers => 300})
    create(:user, {:id => 2, :linkedin_connections => 4, :facebook_connections => 5, :twitter_followers => 7})
    create(:user, {:id => 3, :linkedin_connections => 6, :facebook_connections => 7, :twitter_followers => 8})

    get "/users/?sort_order=desc&limit=1&page=3", as: :json

    expectedRepsonse = {
      "users" => [{"id"=>2, "name"=>"user1", "linkedin_connections"=>4, "facebook_connections"=>5, "twitter_followers"=>7, "social_connection_index"=>3}],
      "page" => 1
    }

    r = JSON.parse(response.body)
    assert_equal 200, response.status
    assert_equal expectedRepsonse["users"], r["users"]
  end

  test "get a list of users without special desc" do
    create(:user, {:id => 1, :linkedin_connections => 5, :facebook_connections => 6, :twitter_followers => 300})
    create(:user, {:id => 2, :linkedin_connections => 5, :facebook_connections => 6, :twitter_followers => 1})

    get "/users/?sort_order=asc&limit=1", as: :json

    expectedRepsonse = {
      "users" => [{"id"=>2, "name"=>"user1", "linkedin_connections"=>5, "facebook_connections"=>6, "twitter_followers"=>1, "social_connection_index"=>3}],
      "page"=> 1,
      "total"=> 2,
      "limit"=> 1
    }

    r = JSON.parse(response.body)
    assert_equal 200, response.status
    assert_equal expectedRepsonse, r
  end

  test "get a list of user sort by facebook connections" do
    create(:user, {:id => 1, :linkedin_connections => 500, :facebook_connections => 10, :twitter_followers => 1})
    create(:user, {:id => 2, :linkedin_connections => 5, :facebook_connections => 6, :twitter_followers => 1})

    get "/users/?sort_order=asc&limit=1", as: :json

    expectedRepsonse = {
      "users" => [{"id"=>2, "name"=>"user1", "linkedin_connections"=>5, "facebook_connections"=>6, "twitter_followers"=>1, "social_connection_index"=>3}],
      "page"=> 1,
      "total"=> 2,
      "limit"=> 1
    }

    r = JSON.parse(response.body)
    assert_equal 200, response.status
    assert_equal expectedRepsonse, r
  end


  # Validation Errors
  test "when validation error occurs for update without id" do
    put '/users/no-numeric-id/',  params: { linkedin_connections: 5}, as: :json

    expectedRepsonse = {
      "code"=>"validation_error",
      "message"=>"Need parameter id to edit user"
    }

    r = JSON.parse(response.body)
    assert_equal 400, response.status
    assert_equal expectedRepsonse, r
  end

  test "when validation error occurs for update with bad connection scores" do
    put '/users/1/',  params: { linkedin_connections: "no-numeric-id"}, as: :json

    expectedRepsonse = {
      "code"=>"validation_error",
      "message"=>"value no-numeric-id is not a valid number"
    }

    r = JSON.parse(response.body)
    assert_equal 400, response.status
    assert_equal expectedRepsonse, r
  end

end
