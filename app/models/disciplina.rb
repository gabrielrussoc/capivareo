class Disciplina < ApplicationRecord
    belongs_to :user
    has_and_belongs_to_many :users
    has_many :atividades
    
    validates :cod, presence: true
    validates :nome, presence: true
    validates :semestre, presence: true
    validate :valid_semestre 

    def valid_semestre
        if semestre == nil || semestre.day != 1 || (semestre.month != 1 && semestre.month != 7)
            errors.add(:semestre, "must be jan 1st or jul 1st")
        end
    end
end
