# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_23_234237) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "atividades", force: :cascade do |t|
    t.string "nome"
    t.text "desc"
    t.bigint "disciplina_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["disciplina_id"], name: "index_atividades_on_disciplina_id"
  end

  create_table "disciplinas", force: :cascade do |t|
    t.string "cod"
    t.text "descr"
    t.string "nome"
    t.datetime "semestre"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_disciplinas_on_user_id"
  end

  create_table "disciplinas_users", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "disciplina_id"
    t.index ["disciplina_id"], name: "index_disciplinas_users_on_disciplina_id"
    t.index ["user_id"], name: "index_disciplinas_users_on_user_id"
  end

  create_table "nota", force: :cascade do |t|
    t.integer "nota"
    t.bigint "atividade_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["atividade_id"], name: "index_nota_on_atividade_id"
    t.index ["user_id"], name: "index_nota_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "nome"
    t.string "nusp"
    t.boolean "is_prof"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["nusp"], name: "index_users_on_nusp", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "atividades", "disciplinas"
  add_foreign_key "disciplinas", "users"
  add_foreign_key "disciplinas_users", "disciplinas"
  add_foreign_key "disciplinas_users", "users"
  add_foreign_key "nota", "atividades"
  add_foreign_key "nota", "users"
end
