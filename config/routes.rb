Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
  devise_scope :user do
    post 'users/check', to: 'sessions#check'
  end

  root 'pages#home'

  get '/disciplinas', to: 'disciplinas#index'
  get '/disciplina', to: 'disciplinas#show'
  get '/mydisciplinas', to: 'disciplinas#index_my'
  post '/disciplinas', to: 'disciplinas#create'
  put '/disciplinas', to: 'disciplinas#update'
  delete '/disciplinas', to: 'disciplinas#destroy'
  post '/enroll', to: 'disciplinas#enroll'
  delete '/enroll', to: 'disciplinas#disenroll'

  get '/atividades', to: 'atividades#index'
  post '/atividades', to: 'atividades#create'
  get '/atividade', to: 'atividades#show'
  
  match '*patch', to: 'pages#home', via: :all #Essa linha tem que ser a ultima
end
