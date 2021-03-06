class AtividadesController < ApplicationController
  before_action :authenticate_user!
  before_action :is_prof?, only: [:create, :show, :update, :destroy]
  before_action :own_disciplina?, only: [:create]
  before_action :own_atividade?, only: [:update, :show, :destroy]

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

  def own_disciplina?
    unless Disciplina.find(params[:atividade][:disciplina_id]).user_id == current_user.id
      render json: {"error": "Você não tem permissão."}, status: :forbidden
    end
  end

  def own_atividade?
    unless Atividade.find(params[:id]).disciplina.user_id == current_user.id
      render json: {"error": "Você não tem permissão."}, status: :forbidden
    end
  end

  def atividade_params
    params.require(:atividade).permit(:nome, :desc, :disciplina_id)
  end

end
