# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

alunos = ['Thiago', 'Victor', 'Matheus', 'Gabriel', 'Juliana']
profs = ['Gubi', 'Carlinhos', 'Lewandowski']

disciplinas = [
  {
    cod: 'MAC0123',
    nome: 'Introdução ao Ruby',
    descr: 'Curso introdutório da linguagem de programação Ruby',
    semestre: '2019-01-01 02:00:00',
    prof: 'Gubi',
    alunos: ['Thiago', 'Victor', 'Matheus', 'Gabriel'],
    atividades: [
      {
        nome: 'EP1',
        desc: 'Primeiro exercício programa',
        notas: {
          Thiago: 100,
          Victor: 100,
          Matheus: 98,
          Gabriel: 87,
        }
      },
      {
        nome: 'EP2',
        desc: 'Segundo exercício programa',
        notas: {
          Thiago: 23,
          Victor: 24,
          Matheus: 33,
          Gabriel: 17,
        }
      },
      {
        nome: 'EP3',
        desc: 'Terceiro exercício programa',
        notas: {
          Thiago: 0,
          Victor: 5,
          Matheus: 2,
          Gabriel: 3,
        }
      },
      {
        nome: 'P1',
        desc: 'Primeira prova',
        notas: {
          Thiago: 100,
          Victor: 100,
          Matheus: 100,
          Gabriel: 100,
        }
      },
      {
        nome: 'P2',
        desc: 'Segunda prova',
        notas: {}
      }
    ]
  },
  {
    cod: 'MAC0321',
    nome: 'Testes de software I',
    descr: 'Testes de unidade, testes de integração, frameworks de teste',
    semestre: '2018-07-01 03:00:00',
    prof: 'Gubi',
    alunos: ['Thiago', 'Victor', 'Matheus', 'Gabriel'],
    atividades: [
      {
        nome: 'EP1',
        desc: 'Primeiro exercício programa',
        notas: {
          Thiago: 84,
          Victor: 43,
          Matheus: 92,
          Gabriel: 13,
        }
      },
      {
        nome: 'EP2',
        desc: 'Segundo exercício programa',
        notas: {
          Thiago: 45,
          Victor: 17,
          Matheus: 25,
          Gabriel: 50,
        }
      },
      {
        nome: 'P1',
        desc: 'Primeira prova',
        notas: {
          Thiago: 90,
          Victor: 85,
          Matheus: 76,
          Gabriel: 14,
        }
      },
    ]
  },
  {
    cod: 'MAC0322',
    nome: 'Testes de software II',
    descr: 'Testes da aplicação como um todo, testes de aceitação',
    semestre: '2019-01-01 02:00:00',
    prof: 'Carlinhos',
    alunos: ['Thiago', 'Victor', 'Matheus', 'Gabriel'],
    atividades: [
      {
        nome: 'EP1',
        desc: 'Primeiro exercício programa',
        notas: {
          Thiago: 88,
          Victor: 77,
          Matheus: 99,
          Gabriel: 66,
        }
      },
      {
        nome: 'P1',
        desc: 'Primeira prova',
        notas: {}
      },
    ]
  },
  {
    cod: 'DES0121',
    nome: 'Fundamentos de Direito Público',
    descr: 'Voltado a iniciantes no estudo do Direito, o curso FUNDAMENTOS DE DIREITO PÚBLICO tem por principal objetivo introduzir o aluno ao fenômeno jurídico pela perspectiva do Direito Público. ',
    semestre: '2019-01-01 02:00:00',
    prof: 'Lewandowski',
    alunos: ['Gabriel', 'Juliana'],
    atividades: [
      {
        nome: 'P1',
        desc: 'Primeira prova',
        notas: {
          Gabriel: 0,
          Juliana: 100,
        }
      },
      {
        nome: 'P2',
        desc: 'Segunda prova',
        notas: {}
      },
      {
        nome: 'Fichamento 1',
        desc: 'Fichamento sobre regimes jurídicos',
        notas: {
          Gabriel: 0,
          Juliana: 100,
        }
      }
    ]
  },
]

alunos.each_with_index do |aluno, idx|
  # p 'Seeding aluno ' + aluno
  User.create({
    nome: aluno,
    nusp: idx.to_s,
    email: aluno + '@a.com',
    password: '123456',
    is_prof: false,
  })
end

profs.each_with_index do |prof, idx|
  # p 'Seeding professor ' + prof
  User.create({
    nome: prof,
    nusp: (100+idx).to_s,
    email: prof + '@a.com',
    password: '123456',
    is_prof: true,
  })
end

disciplinas.each do |dis|

  # p 'Seeding disciplina ' + dis[:nome]
  dis_db = Disciplina.create({
    cod: dis[:cod],
    nome: dis[:nome],
    descr: dis[:descr],
    semestre: dis[:semestre],
    user_id: User.find_by(nome: dis[:prof]).id
  })

  dis[:alunos].each do |aluno|
    # p 'Seeding matricula do ' + aluno + ' em ' + dis_db.nome
    User.find_by(nome: aluno).disciplinas << dis_db;
  end

  dis[:atividades].each do |at|
    # p 'Seeding atividade ' + at[:nome] + ' em ' + dis_db.nome
    at_db = Atividade.create({
      nome: at[:nome],
      desc: at[:desc],
      disciplina_id: dis_db.id
    })

    at[:notas].entries.each do |kv|
      aluno = kv[0].to_s
      nota = kv[1]

      # p 'Seeding nota de ' + at_db.nome + ' de ' + dis_db.nome + ' do ' + aluno
      Nota.create({
        atividade_id: at_db.id,
        user_id: User.find_by(nome: aluno).id,
        nota: nota
      })
    end
  end
end

