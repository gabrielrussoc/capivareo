class CreateAtividades < ActiveRecord::Migration[5.2]
  def change
    create_table :atividades do |t|
      t.string :nome
      t.text :desc
      t.references :disciplina, foreign_key: true

      t.timestamps
    end
  end
end
