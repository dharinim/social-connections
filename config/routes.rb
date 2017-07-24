Rails.application.routes.draw do
  root to: "users#homepage"
  resources :users
end
