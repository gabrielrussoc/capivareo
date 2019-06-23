class Atividade < ApplicationRecord
  belongs_to :disciplina
  has_many :notas, dependent: :delete_all
  validates :nome, presence: true
end
