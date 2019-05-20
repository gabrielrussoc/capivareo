class User < ApplicationRecord
  has_and_belongs_to_many :disciplinas
  validates :nusp, presence: true
  validates :nusp, format: { with: /\A\d*\z/, message: "only allows numbers" }
  validates_uniqueness_of :nusp
  validates :nome, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
