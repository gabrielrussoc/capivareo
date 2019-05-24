# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({
  id: 1,
  nome: 'Thiago',
  nusp: '1234',
  email: 'aluno@a.com',
  password: '123456',
  is_prof: false,
})

User.create({
  id: 2,
  nome: 'Lucas',
  nusp: '4321',
  email: 'prof@a.com',
  password: '123456',
  is_prof: true,
})

User.create({
  id: 3,
  nome: 'Marco',
  nusp: '1243',
  email: 'marco@a.com',
  password: '123456',
  is_prof: true,
})

User.create({
  id: 4,
  nome: 'Luis',
  nusp: '5657',
  email: 'luis@a.com',
  password: '123456',
  is_prof: false,
})

Disciplina.create({
  id: 1,
  cod: 'MAC0123',
  nome: 'Introdução ao Ruby',
  descr: 'Curso introdutório da linguagem de programação Ruby',
  semestre: '2019-01-01 02:00:00',
  user_id: 3
})

Disciplina.create({
  id: 2,
  cod: 'MAC0321',
  nome: 'Testes de software I',
  descr: 'Testes de unidade, testes de integração, frameworks de teste',
  semestre: '2018-07-01 03:00:00',
  user_id: 2
})

Disciplina.create({
  id: 3,
  cod: 'MAC0322',
  nome: 'Testes de software II',
  descr: 'Testes da aplicação como um todo, testes de aceitação',
  semestre: '2019-01-01 02:00:00',
  user_id: 2
})

Atividade.create({
  id: 1,
  nome: 'EP1',
  desc: 'Primeiro exercício programa',
  disciplina_id: 3
})

Atividade.create({
  id: 2,
  nome: 'EP2',
  desc: 'Segundo exercício programa',
  disciplina_id: 3
})

Atividade.create({
  id: 3,
  nome: 'P1',
  desc: 'Primeira prova',
  disciplina_id: 1
})

# Matriculando Thiago em Testes de software II
User.find(1).disciplinas << Disciplina.find(3);

# Matriculando Luis em Testes de software II
User.find(4).disciplinas << Disciplina.find(3);

