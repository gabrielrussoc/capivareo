class Nota < ApplicationRecord
  belongs_to :atividade
  belongs_to :user
end
