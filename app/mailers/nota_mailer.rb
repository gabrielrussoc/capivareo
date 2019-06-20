class NotaMailer < ApplicationMailer
    default from: 'Capivareo <nao-responda@capivareo.com.br>'

    def nota_email(user, atividade, disciplina, nota)
        @user = user
        @nota = nota
        @atividade = atividade
        @disciplina = disciplina
        mail(to: @user.email, subject: "[#{disciplina.cod} #{atividade.nome}] Inclusão de notas")
    end

end
