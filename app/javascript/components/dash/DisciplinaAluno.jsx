// @flow

import React, { Component } from 'react';

import type { AtividadeNotaType, DisciplinaType } from '../../types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

type Props = {
  dis_id: number,
  aluno_id: number,
  classes: Object,
}

type State = {
  atividades: Array<AtividadeNotaType>,
  dis: ?DisciplinaType
};

const styles = theme => ({
  root: {
  },
  table: {
    margin: '0 auto',
  },
});

class DisciplinaAluno extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      atividades: [],
      dis: null,
    }
  }

  fetchNotas = () => {
    axios.get('/notas', {
      params: {
        aluno_id: this.props.aluno_id,
        dis_id: this.props.dis_id,
      }
    }).then(res => {
      this.setState({
        atividades: res.data,
      })
    }).catch(err => {
      console.log(err);
      // TODO: handle errors
    })
  }

  fetchDisciplina = () => {
    axios.get('/disciplina', {
      params: {
        id: this.props.dis_id
      }
    }).then(res => {
      this.setState({
        dis: res.data,
      })
    }).catch(err => {
      console.log(err);
      // TODO: handle errors
    })
  }

  componentDidMount = () => {
    this.fetchNotas();
    this.fetchDisciplina();
  }

  render() {

    if(!this.state.atividades || !this.state.dis) {
      return <CircularProgress />
    }

    const classes = this.props.classes;
    const {atividades, dis } = this.state;
    return (
      <Grid container spacing={24}>

        <Grid item lg={12}>
          <Typography variant='h2'>{dis.cod} {dis.nome}</Typography>
        </Grid>

        <Grid item lg={12} container justify='center'>
          <Grid item lg={4}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Atividade</TableCell>
                    <TableCell align="right">Nota 0-100</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {atividades.map((at, idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {at.nome}
                      </TableCell>
                      <TableCell align="right">{at.nota}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>

      </Grid>
    );
  }
};

export default withStyles(styles)(DisciplinaAluno);