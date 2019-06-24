# Capivareo

[![Build Status](https://travis-ci.org/gabrielrussoc/capivareo.svg?branch=master)](https://travis-ci.org/gabrielrussoc/capivareo)
[![Coverage Status](https://coveralls.io/repos/github/gabrielrussoc/capivareo/badge.svg?branch=master)](https://coveralls.io/github/gabrielrussoc/capivareo?branch=master)
[![License](http://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Capivareo é um sistema de controle de atividades e notas desenvolvido como parte da matéria MAC0218 - Técnicas de Programação do IME-USP no primeiro semestre de 2019.

# Rodando o projeto

## Ruby

O projeto foi escrito em Ruby on Rails. A versão do Ruby usada pelo projeto é `2.6.2` (verifique o arquivo `.ruby-version`). Recomendamos o uso de [rbenv](https://github.com/rbenv/rbenv). Note que [ruby-build](https://github.com/rbenv/ruby-build#readme) também é necessário para a instalação de diferentes versões do Ruby.

Uma maneira simples de utilizá-lo:

```
$ rbenv install 2.6.2
$ rbenv global 2.6.2
$ ruby -v
ruby 2.6.2p47 (2019-03-13 revision 67232) [x86_64-darwin18]
```

Veja `rbenv local` caso não deseje alterar a versão do sistema.

### Bundler

Para gerenciar as gemas do projeto, utilizamos [Bundler](https://bundler.io/). É muito conveniente pois permite que o sistema contenha a mesma gema em diversas versões, mas garante que a aplicação utilize as gemas corretas na versão correta.

Na raiz do projeto, basta rodar:

```
gem install bundler
bundle install
```

**ALERTA**: Vamos preceder diversos comandos com `bundle exec`, para garantir que as gemas corretas serão utilizadas.

## NodeJS

O frontend da aplicação foi escrito em [React](https://reactjs.org/) e portanto tem algumas depedências em Javascript. [NodeJS](https://nodejs.org/en) numa versão `>= 10` é necessário.

```
$ node -v
v11.12.0
```

**ALERTA**: Em alguns sistemas o binário do node é chamado de `nodejs`.

### Yarn

Para gerenciar os pacotes em Javascript, utilizamos [Yarn](https://yarnpkg.com/lang/en/).

Na raiz do projeto, basta rodar:

```
yarn install
```

## Banco de dados

O banco de dados utilizado no momento é o [PostgreSQL](https://www.postgresql.org/).

O projeto se conecta com o banco em `localhost:5432`, padrão do PostgreSQL.

```
$ psql --version
psql (PostgreSQL) 11.2
```

### Criando o banco

Na raiz do projeto, basta rodar:

```
bundle exec rake db:create
```

### Migrações

Conforme o esquema do banco vai sendo modificado, várias migrações são criadas `db/migrate`. Para aplicar todas as migrações, basta rodar na raiz do projeto:

```
bundle exec rake db:migrate
```

### Valores padrão

Para facilitar o desenvolvimento, há uma semente com valores padrões para o banco em `db/seeds.rb`. Para aplicar, basta rodar:

```
bundle exec rake db:seed
```

### Removendo o banco

**USE COM MUITO CUIDADO, NÃO TEM VOLTA!** Se for necessário apagar completamente o banco, basta rodar na raiz do projeto:

```
bundle exec rake db:drop
```

Será necessário criar e migrar o banco novamente.

## Servidor de desenvolvimento

Finalmente, se tudo foi instalado corretamente, basta rodar na raiz do projeto:

```
bundle exec rails s
```

e verificar que tudo está funcionando acessando `localhost:3000`.

## E-mails

Enquanto em desenvolvimento, todos os e-mails são enviados via `smtp` para `localhost:1025`. Para acessar os emails de forma amigável, usamos [mailcatcher](https://mailcatcher.me/).

## Testes

Para testes, utilizamos [RSpec](https://rspec.info/) com auxílio do [FactoryBot](https://github.com/thoughtbot/factory_bot) para facilitar a criação de objetos. Os testes e as *factories* se encontram dentro do diretório `spec`.

Para rodar os testes, basta rodar

```
bundle exec rake spec
```

### SimpleCov

Utilizamos [SimpleCov](https://github.com/colszowka/simplecov) para verificar a cobertura do código pelos testes. Após rodá-los, o relatório é gerado em `coverage/index.html`.

# Usando o sistema

O sistema é muito simples de ser utilizado. É necessário fazer login para ter acesso as funcionalidades. Há duas interfaces: uma para alunos e outra para professores. Descrevemos brevemente as funcionalidades de cada um.

## Alunos

Alunos podem se matricular em disciplinas e ver as notas de suas atividades. Há um aluno padrão no banco (supondo que se rodou `rake db:seed`).

```
email: gabriel@a.com
senha: 123456
```

Na página inicial, é possível se matricular em novas disciplinas pelo botão `Adicionar disciplinas`. Para ver as notas das atividades de uma disciplina, basta clicar no seu cartão correspondente. As disciplinas ficam separadas por semestres, que pode ser escolhido na página inicial.

## Professores

Professores podem criar, editar e remover disciplinas. Dentro de cada disciplina, podem criar, editar e remover atividades, além de dar notas para cada aluno. Há um professor padrão no banco (supondo que se rodou `rake db:seed`).

```
email: gubi@a.com
senha: 123456
```

Uma disciplina é criada na página inicial no botão `Nova disciplina`. As disciplinas são separadas por semestres, que pode ser escolhido na página inicial. Para editar, remover ou gerenciar as atividades de uma disciplina, basta clicar no seu cartão correspondente.

Uma atividade pode ser criada pelo botão `Nova atividade` na página de uma disciplina. Para editar ou remover uma atividade, basta clicar no cartão da atividade na página da disciplina correspondente. Há um modo de correção na página atividade, que destrava os campos Nota de todos os alunos matriculados. Para que as alterações da correção tenham efeito, é necessário clicar no botão `Salvar correção`. Se um aluno não aparece na lista, é porque não se matriculou na disciplina. 