class User < ApplicationRecord
  enum role: [:aluno, :professor, :admin]
  after_initialize :set_default_role, :if => :new_record?

  validates :nusp, presence: true
  validates :nusp, format: { with: /\A\d*\z/, message: "only allows numbers" }
  validates_uniqueness_of :nusp
  validates :nome, presence: true

  def set_default_role
    self.role ||= :aluno
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
