FactoryBot.define do
  factory :user do
    nome { "João" }
    password { "banana" }
    email { "joao@email.com" }
    nusp { "9298041" }
    is_prof { true }
  end

  factory :aluno, class: 'User' do
    nome { "Gabriel "}
    password { "123456" }
    email { "gabriel@email.com" }
    nusp { "4321" }
    is_prof { false }
  end

  factory :prof, class: 'User' do
    nome { "Gubi "}
    password { "123456" }
    email { "gubi@email.com" }
    nusp { "1234" }
    is_prof { true }
  end

  factory :disciplina do
    cod { "MAC0123 "}
    nome { "Introdução ao Ruby" }
    descr { "Linguagem de programação Ruby" }
    semestre { "2019-01-01" }
    user
  end

  factory :atividade do
    nome { "EP1" }
    desc { "Primeiro ex programa" }
    disciplina
  end

  factory :nota do
    nota { 75 }
    user
    atividade
  end
end