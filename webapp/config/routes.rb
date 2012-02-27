Webapp::Application.routes.draw do

  Mercury::Engine.routes

  devise_for :users, :path_names => { :sign_in => 'login', :sign_out => 'logout', :sign_up => 'signup' }

  resources :videos do 
    post 'search' => 'videos#search', :on => :collection
    member do
      post 'priority'
      post 'abuse'
    end
  end

  resources :images do 
    post 'search' => 'images#search', :on => :collection
    member do
      post 'priority'
      post 'abuse'
    end
  end

  resources :texts do 
    post 'search' => 'texts#search', :on => :collection
    member do
      post 'priority'
      post 'abuse'
    end
  end

  resources :audios do 
    post 'search' => 'audios#search', :on => :collection
    member do
      post 'priority'
      post 'abuse'
    end
  end

  resources :nodes

  resources :connections do
    get 'search', :on => :collection
  end

  get 'bank' => 'pages#bank'
  get 'bank/editor' => 'mapmind#editor'
  get 'tags/search' => 'tags#search'
  get 'tags' => 'tags#index'
  match '/tags/show/:tag' => "tags#show"
  get 'maps' => 'maps#index'
  match '/maps/search/:address' => "maps#search"
  get 'timeline' => 'timeline#index'
  match '/profile/:username' => 'pages#profile'
  get 'admin/users' => 'admin/users#index'
  get 'admin/users/search' => 'admin/users#search'
  put 'admin/users/:username/update' => 'admin/users#update', :as => 'admin_users_update'
  root :to => 'pages#index'

  resources :pages do  
    member { post :mercury_update }  
  end  

end
