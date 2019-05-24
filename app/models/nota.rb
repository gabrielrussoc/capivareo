class Nota < ApplicationRecord
  belongs_to :atividade
  belongs_to :user

  validates :nota, :inclusion => 0..100
end
