// @flow

import React from 'react';

type Props = {
  id: number,
}

const DisciplinaAluno = (props: Props) => {
  return (
    `aluno ${props.id}`
  );
};

export default DisciplinaAluno;