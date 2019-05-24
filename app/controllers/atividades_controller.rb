class AtividadesController < ApplicationController
  before_action :authenticate_user!

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
  end

  def edit
  end

  private

  def atividade_params
    params.require(:atividade).permit(:nome, :desc, :disciplina_id)
  end

end
