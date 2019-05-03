class AddNomeNuspToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :nome, :string
    add_column :users, :nusp, :integer
    add_index :users, :nusp, :unique => true
  end
end
