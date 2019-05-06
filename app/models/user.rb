class User < ApplicationRecord
  enum role: [:aluno, :professor, :admin]
  after_initialize :set_default_role, :if => :new_record?
  #TODO: Validar numero USP
  validates_uniqueness_of :nusp

  def set_default_role
    self.role ||= :aluno
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
