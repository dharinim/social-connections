Rails.application.routes.draw do
  root to: "users#index"
  get 'users/user_details', to: "users#user_details"

  # resources :users
end
