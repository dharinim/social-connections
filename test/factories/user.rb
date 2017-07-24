FactoryGirl.define do
  factory :user do
    id 1
    name "user1"
    linkedin_connections 1
    facebook_connections 2
    twitter_followers 3
    social_connection_index { User.compute_social_connection(linkedin_connections, facebook_connections, twitter_followers) }
  end

  # max_users = 1020

  # sequence :linkedin_connections do |number|
  #   number + 101
  # end

  # sequence :facebook_connections do |number|
  #   number + 200
  # end

  # sequence :twitter_followers do |number|
  #   50
  # end

  # sequence :social_connection_index do |number|
  #   User.compute_social_connection(
  #     number,
  #     number,
  #     50
  #   )
  # end

  # sequence :id  do |number|
  #   number
  # end

  # factory :user do
  #   id { generate(:id) }
  #   sequence(:name) { |n| "username#{n}" }
  #   linkedin_connections { generate(:linkedin_connections) }
  #   facebook_connections { generate(:facebook_connections) }
  #   twitter_followers { generate(:twitter_followers) }
  #   social_connection_index { generate(:social_connection_index) }
  # end
end
