class ChangeRoleColumnToBooleanProfColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :role
    add_column :users, :is_prof, :boolean
  end
end
