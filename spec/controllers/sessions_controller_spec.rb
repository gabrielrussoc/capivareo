require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
    context 'logged in' do
        login_aluno
        it 'check returns logged in user' do
            get :check
            expect(response.body).to eq(subject.current_user.to_json)
        end
    end

    context 'not logged in' do
        it 'checked returns no user logged in' do
            @request.env["devise.mapping"] = Devise.mappings[:user]
            get :check
            expect(response.status).to eq(422)
            expect(response.body).to eq({error: 'no user logged in'}.to_json)
        end
    
    end

end
