class ChangeNuspToBeStringInUsers < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :nusp, :string
  end
end
