# Capivareo

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

O banco de dados utilizado no momento é o [SQLite3](https://www.sqlite.org/index.html), padrão em projetos rails.

É necessário apenas uma instalação do banco na máquina.

```
$ sqlite3
SQLite version 3.24.0 2018-06-04 14:10:15
```

Como SQLite3 é _serverless_, nenhuma configuração extra é necessária.

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