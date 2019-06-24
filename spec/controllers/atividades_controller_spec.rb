require 'rails_helper'

RSpec.describe AtividadesController, type: :controller do
    context 'aluno' do
        login_aluno

        it 'lists all atividades from a disciplina' do
            aluno = subject.current_user

            dis = create(:disciplina)
            aluno.disciplinas << dis
            at1 = create(:atividade, disciplina: dis)
            at2 = create(:atividade, disciplina: dis)

            get :index, params: { dis_id: dis.id }
            expect(response.body).to eq([at1, at2].to_json)
        end

        it 'cant create atividade' do
            post :create
            expect(response.status).to eq(403)
        end

        it 'cant edit atividade' do
            put :update
            expect(response.status).to eq(403)
        end

        it 'cant delete atividade' do
            delete :destroy
            expect(response.status).to eq(403)
        end

        it 'cant see notas from other alunos' do
            get :show
            expect(response.status).to eq(403)
        end
    end

    context 'prof' do
        login_prof

        it 'lists all atividades from a disciplina' do
            aluno = subject.current_user

            dis = create(:disciplina)
            aluno.disciplinas << dis
            at1 = create(:atividade, disciplina: dis)
            at2 = create(:atividade, disciplina: dis)

            get :index, params: { dis_id: dis.id }
            expect(response.body).to eq([at1, at2].to_json)
        end

        it 'can create an atividade on its own disciplina' do
            prof = subject.current_user
            dis = create(:disciplina, user: prof)
            params = {
                atividade: {
                    nome: 'EP1',
                    desc: '',
                    disciplina_id: dis.id
                }
            }
            post :create, params: params, as: :json
            expect(response.status).to eq(200)
            expect(response.body).to eq(Atividade.find_by(nome: 'EP1').to_json)
        end

        it 'cant create an atividade on another prof disciplina' do
            other_prof = create(:prof, nusp: '66', email: 'other@a.com')
            dis = create(:disciplina, user: other_prof)
            params = {
                atividade: {
                    nome: 'EP1',
                    desc: '',
                    disciplina_id: dis.id
                }
            }
            post :create, params: params, as: :json
            expect(response.status).to eq(403)
        end

        it 'can update own atividade' do
            prof = subject.current_user
            dis = create(:disciplina, user: prof)
            at = create(:atividade, disciplina: dis, desc: '')
            params = {
                id: at.id,
                nome: at.nome,
                desc: 'blabla',
                disciplina_id: at.disciplina_id
            }
            put :update, params: params, as: :json
            expect(response.status).to eq(200)
            expect(response.body).to eq(at.reload.to_json)
        end

        it 'cant update other prof atividade' do
            other_prof = create(:prof, nusp: '66', email: 'other@a.com')
            dis = create(:disciplina, user: other_prof)
            at = create(:atividade, disciplina: dis, desc: '')
            params = {
                id: at.id,
                nome: at.nome,
                desc: 'blabla',
                disciplina_id: at.disciplina_id
            }
            put :update, params: params, as: :json
            expect(response.status).to eq(403)
        end

        it 'can destroy own atividade' do
            prof = subject.current_user
            dis = create(:disciplina, user: prof)
            at = create(:atividade, disciplina: dis)

            delete :destroy, params: { id: at.id }
            expect(response.status).to eq(204)
        end

        it 'cant destroy other prof atividade' do
            other_prof = create(:prof, nusp: '66', email: 'other@a.com')
            dis = create(:disciplina, user: other_prof)
            at = create(:atividade, disciplina: dis)

            delete :destroy, params: { id: at.id }
            expect(response.status).to eq(403)
        end

        it 'can see notas from own atividade' do
            prof = subject.current_user
            dis = create(:disciplina, user: prof)
            at = create(:atividade, disciplina: dis)

            aluno1 = create(:aluno)
            aluno2 = create(:aluno, nusp: '12', email: 'outro@aluno.com')
            aluno1.disciplinas << dis
            aluno2.disciplinas << dis

            nota1 = create(:nota, user: aluno1, atividade: at, nota: 50)
            nota2 = create(:nota, user: aluno2, atividade: at, nota: 51)

            get :show, params: { id: at.id }
            expect(response.status).to eq(200)
            expect(response.body).to eq(
                {
                    atividade: at, 
                    disciplina: dis,
                    alunos: [aluno1, aluno2],
                    notas: [nota1, nota2]
                }.to_json
            )
        end

        it 'cant see notas from other prof atividade' do
            other_prof = create(:prof, nusp: '66', email: 'other@a.com')
            dis = create(:disciplina, user: other_prof)
            at = create(:atividade, disciplina: dis)

            aluno1 = create(:aluno)
            aluno2 = create(:aluno, nusp: '12', email: 'outro@aluno.com')
            aluno1.disciplinas << dis
            aluno2.disciplinas << dis

            nota1 = create(:nota, user: aluno1, atividade: at, nota: 50)
            nota2 = create(:nota, user: aluno2, atividade: at, nota: 51)

            get :show, params: { id: at.id }
            expect(response.status).to eq(403)
        end
    end
end
