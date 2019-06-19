# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({
  nome: 'Thiago',
  nusp: '1234',
  email: 'aluno@a.com',
  password: '123456',
  is_prof: false,
})

User.create({
  nome: 'Lucas',
  nusp: '4321',
  email: 'prof@a.com',
  password: '123456',
  is_prof: true,
})

User.create({
  nome: 'Marco',
  nusp: '1243',
  email: 'marco@a.com',
  password: '123456',
  is_prof: true,
})

User.create({
  nome: 'Luis',
  nusp: '5657',
  email: 'luis@a.com',
  password: '123456',
  is_prof: false,
})

Disciplina.create({
  cod: 'MAC0123',
  nome: 'Introdução ao Ruby',
  descr: 'Curso introdutório da linguagem de programação Ruby',
  semestre: '2019-01-01 02:00:00',
  user_id: User.find_by(nome: 'Lucas').id
})

Disciplina.create({
  cod: 'MAC0321',
  nome: 'Testes de software I',
  descr: 'Testes de unidade, testes de integração, frameworks de teste',
  semestre: '2018-07-01 03:00:00',
  user_id: User.find_by(nome: 'Lucas').id
})

Disciplina.create({
  cod: 'MAC0322',
  nome: 'Testes de software II',
  descr: 'Testes da aplicação como um todo, testes de aceitação',
  semestre: '2019-01-01 02:00:00',
  user_id: User.find_by(nome: 'Lucas').id
})

Atividade.create({
  nome: 'EP1',
  desc: 'Primeiro exercício programa',
  disciplina_id: Disciplina.find_by(cod: 'MAC0322').id
})

Atividade.create({
  nome: 'EP2',
  desc: 'Segundo exercício programa',
  disciplina_id: Disciplina.find_by(cod: 'MAC0322').id
})

Atividade.create({
  nome: 'P1',
  desc: 'Primeira prova',
  disciplina_id: Disciplina.find_by(cod:'MAC0123').id
})

# Matriculando Thiago em Testes de software II
User.find_by(nome: 'Thiago').disciplinas << Disciplina.find_by(cod: 'MAC0322');

# Matriculando Luis em Testes de software II
User.find_by(nome: 'Luis').disciplinas << Disciplina.find_by(cod: 'MAC0322');

