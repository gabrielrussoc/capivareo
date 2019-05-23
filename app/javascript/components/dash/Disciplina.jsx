// @flow

import React from 'react';

import type { UserType } from '../../types';

import { DisciplinaAluno, DisciplinaProf } from '.';


type Props = {
  match: Object, // url params
  currentUser: UserType,
}

const Disciplina = (props: Props) => {
  const id = props.match.params.id;
  return (
    props.currentUser && props.currentUser.is_prof
    ? <DisciplinaProf id={id} />
    : <DisciplinaAluno id={id} />
  );
};

export default Disciplina;