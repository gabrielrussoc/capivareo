class DisciplinasController < ApplicationController
  before_action :authenticate_user!
  before_action :is_prof?, only: [:create, :index_my, :destroy, :update]
  before_action :is_aluno?, only: [:enroll, :disenroll, :index]
  
  def index
    render json: 
      Disciplina
      .where(semestre: params[:semestre])
      .select('disciplinas.*, (SELECT 1 FROM disciplinas_users WHERE user_id = ' + current_user.id.to_s + ' AND disciplina_id = id) AS enrolled')
      .includes(:user)
      .as_json(include: { user: { only: :nome }})
  end

  def index_my
    render json: Disciplina.where(:user_id => current_user.id)
  end

  def create
    disc = Disciplina.create(disciplina_params)
    disc.save!

    render json: disc
  end

  def enroll
    user = User.find(current_user.id)
    disciplina = Disciplina.find(params[:disciplina_id])
    user.disciplinas << disciplina
    render json: {}
  end

  def disenroll
    User.find(current_user.id).destroy([:disciplina_id])
  end

  def show
    render json: Disciplina.find(params[:id])
  end

  def update
    disciplina = Disciplina.find(params[:disciplina][:id])
    if disciplina.update(disciplina_params)
      render json: disciplina
    end
  end

  def destroy
    Disciplina.find(params[:id]).destroy
  end

  private

  def disciplina_params
    params.require(:disciplina).permit(:cod, :descr, :nome, :semestre, :user_id)
  end

  def is_prof?
    unless current_user.is_prof
      render json: {"error": "Você não tem permissão!"}, status: :forbidden
    end
  end

  def is_aluno?
    unless !current_user.is_prof
      render json: {"error": "Você não tem permissão!"}, status: :forbidden
    end
  end
end
