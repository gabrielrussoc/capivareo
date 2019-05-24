// @flow

import React, { Component } from 'react';

import type { UserType, AtividadeType, DisciplinaType } from '../../types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

type Props = {
  match: Object, // url params
  currentUser: UserType,
}

type State = {
  at: ?AtividadeType,
  dis: ?DisciplinaType,
  alunos: Array<UserType>,
}

class Atividade extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      at: null,
      dis: null,
      alunos: [],
    }
  }

  fetchData = () => {
    axios.get('/atividade', {
      params: {
        id: this.props.match.params.id,
      }
    }).then(res => {
      this.setState({
        at: res.data.atividade,
        dis: res.data.disciplina,
        alunos: res.data.alunos,
      })
    }).catch(err => {
      console.log(err);
      // TODO: handle errors
    })
  }

  componentDidMount = () => {
    this.fetchData();
  }

  render() {

    if(!this.state.at || !this.state.dis)
      return <CircularProgress />

    const { at, dis, alunos } = this.state;

    return (
      <Grid container spacing={24}>

        <Grid item lg={12}>
          <Typography variant='h2'>{at.nome}</Typography>
          <Typography variant='subtitle1'>{dis.nome}</Typography>
        </Grid>

        <Grid item lg={12}>
          botoes
        </Grid>

        <Grid item lg={12}>
          {alunos[0].nome}
        </Grid>

      </Grid>
    );
  }
};

export default Atividade;