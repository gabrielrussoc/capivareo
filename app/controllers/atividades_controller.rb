class AtividadesController < ApplicationController
  before_action :authenticate_user!
  # validar aluno e professor
  # validar nome e descricao

  def index
    atividades = Disciplina.find(params[:dis_id]).atividades
    render json: atividades
  end

  def create
    atividade = Atividade.create(atividade_params)
    atividade.save!
    render json: atividade
  end

  def show
    at = Atividade.find(params[:id])
    dis = at.disciplina
    alunos = dis.users
    notas = at.notas
    render json: 
      { 
        atividade: at, 
        disciplina: dis,
        alunos: alunos,
        notas: notas
      }
  end

  def update
    atividade = Atividade.find(params[:atividade][:id])
    if atividade.update(atividade_params)
      render json: atividade
    end
  end

  def destroy
    Atividade.find(params[:id]).destroy
  end

  private

  def atividade_params
    params.require(:atividade).permit(:nome, :desc, :disciplina_id)
  end

end
