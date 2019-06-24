require 'rails_helper'

RSpec.describe RegistrationsController, type: :controller do
    it 'is able to register an user' do
        @request.env["devise.mapping"] = Devise.mappings[:user]
        user = {
            user: {
                nome: 'Claudio',
                nusp: '42',
                email: 'claudio@email.com',
                password: '123456',
                is_prof: false
            }
        }
        post :create, params: user, as: :json
        expect(response.status).to eq(201)
        expect(response.body).to eq(User.find_by(nusp: '42').to_json)
    end
end
