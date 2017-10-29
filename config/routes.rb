Rails.application.routes.draw do
  root to: 'home#index'
  devise_for :users

  get 'home/index'

  resources :conversations, only: %i[create] do
    member do
      post :close
    end

    resources :messages, only: [:create]
  end
end
