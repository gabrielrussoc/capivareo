class User < ApplicationRecord
  enum role: [:aluno, :professor, :admin]
  after_initialize :set_default_role, :if => :new_record?

  validates_uniqueness_of :nusp
  validates :nusp, presence: true, format: { with: /[0-9]+/, message: "only allows numbers" }
  validates :nome, presence: true

  def set_default_role
    self.role ||= :aluno
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
