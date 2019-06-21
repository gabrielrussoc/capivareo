class Atividade < ApplicationRecord
  belongs_to :disciplina
  has_many :notas
  validates :nome, presence: true
end
