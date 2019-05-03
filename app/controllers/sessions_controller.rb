class SessionsController < Devise::SessionsController
    respond_to :json

    def check
        if user_signed_in?
            render json: current_user
        else
            render json: {error: 'no user logged in'}, status: :unprocessable_entity
        end
    end
end