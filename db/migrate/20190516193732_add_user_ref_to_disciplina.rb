class AddUserRefToDisciplina < ActiveRecord::Migration[5.2]
  def change
    add_reference :disciplinas, :user, foreign_key: true
  end
end
