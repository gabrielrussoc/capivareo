class ApplicationController < ActionController::Base
    # protect_from_forgery with: :null_session
    # https://github.com/gabrielrussoc/capivareo/issues/1
    skip_before_action :verify_authenticity_token
    respond_to :json
  
    before_action :dev_delay

    protected

    def is_prof?
        unless current_user.is_prof
          render json: {"error": "Você não tem permissão."}, status: :forbidden
        end
    end
    
    def is_aluno?
        unless !current_user.is_prof
          render json: {"error": "Você não tem permissão."}, status: :forbidden
        end
    end

    private
    # adds 1s delay only if in development env
    def dev_delay 
        if Rails.env.development?
            sleep 1
        end
    end
end
