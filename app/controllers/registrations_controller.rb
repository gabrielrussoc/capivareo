class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    private

    def sign_up_params
        params.require(:user).permit(:nome, :nusp, :email, :password)
    end
end