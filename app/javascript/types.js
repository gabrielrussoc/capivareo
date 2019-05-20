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