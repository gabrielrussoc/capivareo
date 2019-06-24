require 'rails_helper'

RSpec.describe NotasController, type: :controller do
    context 'aluno' do
        login_aluno

        it 'can access quick_view' do
            get :quick_view
            expect(response.status).to eq(200)
        end

        it 'gets notas from all disciplinas on quick_view' do
            prof = create(:prof)
            aluno = subject.current_user

            dis1 = create(:disciplina, nome: 'MAC123', user: prof)
            dis2 = create(:disciplina, nome: 'MAC321', user: prof)

            at1 = create(:atividade, nome: 'EP1', disciplina: dis1)
            at2 = create(:atividade, nome: 'EP1', disciplina: dis2)

            nota1 = create(:nota, atividade: at1, user: aluno, nota: 99)
            nota2 = create(:nota, atividade: at2, user: aluno, nota: 100)

            get :quick_view, params: { semestre: dis1.semestre }
            res = JSON.parse(response.body)
            res = res.sort{|a, b| a['nota'] - b['nota']}

            expect(res.length).to eq(2)
            expect(res[0]['id']).to eq(nota1.id)
            expect(res[1]['id']).to eq(nota2.id)
        end

        it 'only gets atividades with nota on quick_view' do
            prof = create(:prof)
            aluno = subject.current_user

            dis1 = create(:disciplina, nome: 'MAC123', user: prof)

            at1 = create(:atividade, nome: 'EP1', disciplina: dis1)
            at2 = create(:atividade, nome: 'EP2', disciplina: dis1)

            nota = create(:nota, atividade: at1, user: aluno, nota: 99)

            get :quick_view, params: { semestre: dis1.semestre }
            res = JSON.parse(response.body)
            res = res.sort{|a, b| a['nota'] - b['nota']}
            
            expect(res.length).to eq(1)
            expect(res[0]['id']).to eq(nota.id)
        end

        it 'can access index' do
            dis = create(:disciplina)
            aluno = subject.current_user
            get :index, params: { dis_id: dis.id, aluno_id: aluno.id }
            expect(response.status).to eq(200)
        end

        it 'gets notas from all atividades' do
            dis = create(:disciplina)
            aluno = subject.current_user
            at1 = create(:atividade, nome: 'EP1', disciplina: dis)
            at2 = create(:atividade, nome: 'EP2', disciplina: dis)
            nota1 = create(:nota, user: aluno, atividade: at1, nota: 32)
            
            get :index, params: { dis_id: dis.id, aluno_id: aluno.id }

            res = JSON.parse(response.body)
            expect(res.length).to eq(2)
            expect(res[0]['id']).to eq(at1.id)
            expect(res[0]['nota']).to eq(32)
            expect(res[1]['id']).to eq(at2.id)
            expect(res[1]['nota']).to eq(nil)
        end

        it 'cant access create_or_update' do
            post :create_or_update
            expect(response.status).to eq(403)
        end
    end

    context 'prof' do
        login_prof

        it 'can access create_or_update of owned disciplina' do
            prof = subject.current_user
            dis = create(:disciplina, user: prof)
            at = create(:atividade, disciplina: dis)
            post :create_or_update, params: { atividade_id: at.id, notas: [] }, as: :json
            expect(response.status).to eq(200)
        end

        it 'cant access create_or_update of other prof disciplina' do
            other_prof = create(:prof, nusp: '999', email: 'other@email.com')
            dis = create(:disciplina, user: other_prof)
            at = create(:atividade, disciplina: dis)
            post :create_or_update, params: { atividade_id: at.id, notas: [] }, as: :json
            expect(response.status).to eq(403)
        end

        it 'can grade atividade' do
            prof = subject.current_user
            aluno = create(:aluno)
            dis = create(:disciplina, user: prof)
            at = create(:atividade, disciplina: dis)
            aluno.disciplinas << dis
            params = {
                atividade_id: at.id,
                notas: [
                    {
                        aluno_id: aluno.id,
                        nota: 3
                    }
                ]
            }
            post :create_or_update, params: params, as: :json
            expect(response.status).to eq(200)
            res = JSON.parse(response.body)
            expect(res[aluno.id.to_s]).to eq(false) # no errors on the grade
        end
    end
end
