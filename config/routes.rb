Rails.application.routes.draw do
  # root to: "users#index"
  # get '/users/user_details', to: "users#user_details"
  # post '/users/edit', to: "users#edit"
  # post '/users/create', to: "users#create"
  # post '/users/sort', to: "users#sort"

  root to: "users#homepage"
  resources :users
end
