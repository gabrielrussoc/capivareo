// @flow

export type ColorType = 'orange' | 'blue';

export type UserType = {
    nome: string,
    nusp: number,
    email: string,
    is_prof: boolean,
    id: number,
};

export type DisciplinaType = {|
    nome: string,
    cod: string,
    descr: string,
    semestre: Date,
    id: number,
|};

export type DisciplinaProfType = {
    ...DisciplinaType,
    user: {
        nome: string,
    },
    enrolled: ?boolean,
};

export type AtividadeType = {|
    id: number,
    nome: string,
    desc: string,
|};

export type NotaType = {|
    id: number,
    nota: number,
    user_id: number,
    atividade_id: number,
|};

export type AtividadeNotaType = {|
    ...AtividadeType,
    nota: number,
|};