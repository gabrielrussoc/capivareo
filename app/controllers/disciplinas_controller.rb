class DisciplinasController < ApplicationController
  before_action :authenticate_user!
  before_action :is_prof?
  def index
    render json: Disciplina.all
  end

  def create
    disc = Disciplina.create(disciplina_params)
    disc.save!

    render json: disc
  end

  def show
  end

  def destroy
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
end
