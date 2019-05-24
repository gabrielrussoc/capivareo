class NotasController < ApplicationController
  before_action :authenticate_user!
  # TODO: validacoes

  def index
    dis_id = params[:dis_id]
    user_id = params[:aluno_id]
    render json:
      Disciplina.find(dis_id)
      .atividades
      .left_outer_joins(:notas)
      .includes(:notas)
      .where(nota: { user_id: [nil, user_id] })
      .select('atividades.*, nota.nota')
      .as_json
  end

  def create_or_update
    status = {}
    params[:notas].each do |n| 
      aluno_id = n[:aluno_id]
      atividade_id = n[:atividade_id]
      nota = Nota.find_or_create_by(user_id: aluno_id, atividade_id: atividade_id)
      status[aluno_id] = !nota.update(nota: n[:nota])
    end
    render json: status
  end
end
