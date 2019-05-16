class CreateDisciplinas < ActiveRecord::Migration[5.2]
  def change
    create_table :disciplinas do |t|
      t.string :cod
      t.text :descr
      t.string :nome
      t.datetime :semestre

      t.timestamps
    end
  end
end
