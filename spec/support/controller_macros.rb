module ControllerMacros
    def login_prof
        before(:each) do
            @request.env["devise.mapping"] = Devise.mappings[:user]
            sign_in FactoryBot.create(:prof)
        end
    end

    def login_aluno
        before(:each) do
            @request.env["devise.mapping"] = Devise.mappings[:user]
            sign_in FactoryBot.create(:aluno)
        end
    end
end