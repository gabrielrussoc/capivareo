FactoryBot.define do
  factory :user do
    nome { "João" }
    password { "banana" }
    email { "joao@email.com" }
    nusp { "9298041" }
    is_prof { false }
  end

  factory :disciplina do
  end

  factory :atividade do
  end

  factory :nota do
    nota { 75 }
    user
    atividade
  end
end