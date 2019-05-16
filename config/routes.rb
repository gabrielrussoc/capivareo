Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
  devise_scope :user do
    post 'users/check', to: 'sessions#check'
  end

  root 'pages#home'

  resources :disciplinas
  match '*patch', to: 'pages#home', via: :all #Essa linha tem que ser a ultima
end
