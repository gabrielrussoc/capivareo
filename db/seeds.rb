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

Disciplina.create({
  id: 1,
  cod: 'MAC0123',
  nome: 'Introdução ao Ruby',
  semestre: '2019-01-01 02:00:00',
  user_id: 3
})

Disciplina.create({
  id: 2,
  cod: 'MAC0321',
  nome: 'Testes de software I',
  semestre: '2018-07-01 03:00:00',
  user_id: 2
})

Disciplina.create({
  id: 3,
  cod: 'MAC0322',
  nome: 'Testes de software II',
  semestre: '2019-01-01 02:00:00',
  user_id: 2
})

# Matriculando Thiago em Testes de software II
User.find(1).disciplinas << Disciplina.find(3);

