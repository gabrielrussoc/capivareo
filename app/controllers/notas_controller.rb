class NotasController < ApplicationController
  before_action :authenticate_user!
  before_action :is_aluno?, only: [:quick_view]
  before_action :is_prof?, only: [:create_or_update]
  before_action :owns_atividade, only: [:create_or_update]

  def quick_view
    render json:
      current_user
        .notas
        .includes(atividade: :disciplina)
        .where(disciplinas: { semestre: params[:semestre] })
        .map{ |nota| nota.as_json(include: { atividade: { include: :disciplina } } ) }
        .as_json
  end

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
    notas_to_notify = []
    atividade_id = params[:atividade_id]
    params[:notas].each do |n| 
      aluno_id = n[:aluno_id]
      nota = Nota.find_or_create_by(user_id: aluno_id, atividade_id: atividade_id)
      is_different = nota.nota != n[:nota].to_i
      has_error = !nota.update(nota: n[:nota])
      status[aluno_id] = has_error # users with errors
      if !has_error and is_different
        notas_to_notify.append(nota.id)
      end
    end
    Nota.includes(:user, atividade: :disciplina).find(notas_to_notify).each{|nota|
      NotaMailer.nota_email(nota.user, nota.atividade, nota.atividade.disciplina, nota).deliver_now
    }
    render json: status
  end

  private

  def owns_atividade
    unless Atividade.find(params[:atividade_id]).disciplina.user_id == current_user.id
      render json: {"error": "Você não é o professor responsável."}, status: :forbidden
    end
  end
end
