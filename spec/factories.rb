FactoryBot.define do
  factory :user do
    nome { "João" }
    password { "banana" }
    email { "joao@email.com" }
    nusp { "9298041" }
    is_prof { false }
  end

  factory :disciplina do
    cod { "MAC0123 "}
    nome { "Introdução ao Ruby" }
    descr { "Linguagem de programação Ruby" }
    semestre { "2019-01-01" }
    user
  end

  factory :atividade do
  end

  factory :nota do
    nota { 75 }
    user
    atividade
  end
end