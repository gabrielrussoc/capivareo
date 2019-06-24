require 'rails_helper'

RSpec.describe DisciplinasController, type: :controller do
    context 'aluno' do
        login_aluno

        it 'enroll on disciplina' do
            aluno = subject.current_user
            dis = create(:disciplina)
            post :enroll, params: { disciplina_id: dis.id }
            expect(response.status).to eq(200)
            expect(aluno.disciplinas).to eq([dis])
        end

        it 'disenroll from disciplina' do
            aluno = subject.current_user
            dis = create(:disciplina)
            aluno.disciplinas << dis
            delete :disenroll, params: { disciplina_id: dis.id }
            aluno.reload
            expect(response.status).to eq(200)
            expect(aluno.disciplinas).to eq([])
        end

        it 'show disciplina' do
            dis = create(:disciplina)
            get :show, params: { id: dis.id }, as: :json
            expect(response.status).to eq(200)
            expect(response.body).to eq(dis.to_json)
        end

        it 'list disciplinas from a semestre with enrolled status' do
            aluno = subject.current_user
            prof = create(:prof)
            dis1 = create(:disciplina, nome: 'MAC1', user: prof)
            dis2 = create(:disciplina, nome: 'MAC2', user: prof)
            sem = dis1.semestre
            aluno.disciplinas << dis1

            dis1 = dis1.as_json
            dis2 = dis2.as_json
            dis1[:enrolled] = 1
            dis1[:user] = { nome: prof.nome }
            dis2[:enrolled] = nil
            dis2[:user] = { nome: prof.nome }

            get :index, params: { semestre: sem }
            expect(response.status).to eq(200)
            expect(response.body).to eq([dis1,dis2].to_json)
        end

        it 'cant create disciplina' do
            aluno = subject.current_user
            params = {
                cod: 'MAC1',
                descr: '',
                nome: 'Intro',
                semestre: '2019-01-01',
                user_id: aluno.id
            }
            post :create, params: params, as: :json
            expect(response.status).to eq(403)
        end

        it 'cant update disciplina' do 
            prof = create(:prof)
            dis = create(:disciplina, descr: '', user: prof)
            params = {
                disciplina: {
                    cod: dis.cod,
                    descr: 'blabla',
                    nome: dis.nome,
                    semestre: dis.semestre,
                    user_id:  prof.id
                }
            }
            put :update, params: params, as: :json
            expect(response.status).to eq(403)
        end

        it 'cant destroy disciplina' do
            prof = create(:prof)
            dis = create(:disciplina, user: prof)
            
            delete :destroy, params: { id: dis.id }
            expect(response.status).to eq(403)
        end

        it 'cant list prof disciplinas' do
            dis = create(:disciplina)

            get :index_my, params: { semestre: dis.semestre }
            expect(response.status).to eq(403)
        end
    end

    context 'prof' do
        login_prof

        it 'create disciplina' do
            prof = subject.current_user
            params = {
                cod: 'MAC1',
                descr: '',
                nome: 'Intro',
                semestre: '2019-01-01',
                user_id: prof.id
            }
            post :create, params: params, as: :json
            expect(response.status).to eq(200)
            expect(response.body).to eq(Disciplina.find_by(cod: 'MAC1').to_json)
        end

        it 'list own disciplinas' do
            prof = subject.current_user
            dis1 = create(:disciplina, user: prof)
            dis2 = create(:disciplina, user: prof)

            get :index_my, params: { semestre: dis1.semestre }

            expect(response.status).to eq(200)
            expect(response.body).to eq([dis1, dis2].to_json)
        end

        it 'destroy own disciplina' do
            prof = subject.current_user
            dis = create(:disciplina, user: prof)
            
            delete :destroy, params: { id: dis.id }
            prof.reload
            expect(response.status).to eq(200)
            expect(prof.disciplinas).to eq([])
        end

        it 'cant destroy other prof disciplina' do
            other_prof = create(:prof, nusp: '99', email: 'other@a.com')
            dis = create(:disciplina, user: other_prof)
            
            delete :destroy, params: { id: dis.id }
            expect(response.status).to eq(403)
        end

        it 'update disciplina' do
            prof = subject.current_user
            dis = create(:disciplina, descr: '', user: prof)
            params = {
                id: dis.id,
                disciplina: {
                    id: dis.id,
                    cod: dis.cod,
                    descr: 'blabla',
                    nome: dis.nome,
                    semestre: dis.semestre,
                    user_id: dis.user_id
                }
            }
            put :update, params: params, as: :json
            expect(response.status).to eq(200)
            expect(dis.reload.descr).to eq('blabla')
        end

        it 'cant update other prof disciplina' do 
            other_prof = create(:prof, nusp: '99', email: 'other@a.com')
            dis = create(:disciplina, descr: '', user: other_prof)
            params = {
                id: dis.id,
                disciplina: {
                    id: dis.id,
                    cod: dis.cod,
                    descr: 'blabla',
                    nome: dis.nome,
                    semestre: dis.semestre,
                    user_id:  other_prof.id
                }
            }
            put :update, params: params, as: :json
            expect(response.status).to eq(403)
        end

        it 'cant enroll on disciplina' do
            prof = subject.current_user
            dis = create(:disciplina)
            post :enroll, params: { disciplina_id: dis.id }
            expect(response.status).to eq(403)
        end
    end
end
