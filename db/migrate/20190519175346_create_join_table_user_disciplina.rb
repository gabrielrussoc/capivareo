class CreateJoinTableUserDisciplina < ActiveRecord::Migration[5.2]
  def change
    create_join_table :users, :disciplinas do |t|
      t.references :user, foreign_key: true
      t.references :disciplina, foreign_key: true
    end
  end
end
