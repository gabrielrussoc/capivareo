class ApplicationController < ActionController::Base
    # protect_from_forgery with: :null_session
    # https://github.com/gabrielrussoc/capivareo/issues/1
    skip_before_action :verify_authenticity_token
    respond_to :json
  
    before_action :dev_delay

    private
    # adds 1s delay only if in development env
    def dev_delay 
        if Rails.env.development?
            sleep 1
        end
    end
end
