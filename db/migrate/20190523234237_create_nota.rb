class CreateNota < ActiveRecord::Migration[5.2]
  def change
    create_table :nota do |t|
      t.integer :nota
      t.references :atividade, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
