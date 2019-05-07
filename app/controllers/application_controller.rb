class ApplicationController < ActionController::Base
    # protect_from_forgery with: :null_session
    # https://github.com/gabrielrussoc/capivareo/issues/1
    skip_before_action :verify_authenticity_token
end
