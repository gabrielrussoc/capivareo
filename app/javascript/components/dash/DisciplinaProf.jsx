// @flow

import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom"

import axios from 'axios';

import type { DisciplinaType, AtividadeType } from '../../types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'

import CreateAtividade from './CreateAtividade';
import EditDisciplina from './EditDisciplina';
import RemoveDisciplina from './RemoveDisciplina';

type Props = {
  id: number,
  classes: Object,
}

type State = {
  dis: ?DisciplinaType,
  atividades: Array<AtividadeType>,
  createAtividade: boolean,
  editDisciplina: boolean,
  removeDisciplina: boolean,
}

const styles = theme => ({
  button: {
    margin: 1 * theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  card: {
    textAlign: 'center',
  }
});

class DisciplinaProf extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      dis: null,
      createAtividade: false,
      editDisciplina: false,
      removeDisciplina: false,
      atividades: [],
    }
  }

  fetchAtividades = () => {
    axios.get('/atividades', {
      params: {
        dis_id: this.props.id,
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
        id: this.props.id
      }
    }).then(res => {
      let dis = res.data;
      dis.semestre = new Date(dis.semestre);
      this.setState({
        dis: dis,
      })
    }).catch(err => {
      console.log(err);
      // TODO: handle errors
    })
  }

  componentDidMount = () => {
    this.fetchDisciplina();
    this.fetchAtividades();
  }

  handleCancelCreateAtividade = (didCreate: boolean) => {
    this.setState({
      createAtividade: false,
    })
    if (didCreate)
      this.fetchAtividades();
  }

  handleCancelEditDisciplina = (didEdit: boolean) => {
    this.setState({
      editDisciplina: false,
    })
    if (didEdit)
      this.fetchDisciplina();
  }

  handleCancelRemoveDisciplina = () => {
    this.setState({
      removeDisciplina: false,
    })
  }

  render() {
    if (!this.state.dis || !this.state.atividades) {
      return <CircularProgress />
    }
    const { classes } = this.props;
    const { dis } = this.state;

    const atividadesGrid = this.state.atividades
      .map((at, idx) =>
          <Grid item xs={6} key={idx}>
            <Card className={classes.card}>
              <CardActionArea component={Link} to={`/atividades/${at.id}`}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {at.nome}
                  </Typography>
                  <Typography component="p">
                    {at.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          // TODO: extrair para o grid um componente para reutilizar
      );

    return (
      <Fragment>
        <CreateAtividade 
          dis_id={this.props.id} 
          open={this.state.createAtividade} 
          handleClose={this.handleCancelCreateAtividade} 
        />
        <EditDisciplina
          dis={dis}
          open={this.state.editDisciplina}
          handleClose={this.handleCancelEditDisciplina}
        />
        <RemoveDisciplina
          dis={dis}
          open={this.state.removeDisciplina}
          handleClose={this.handleCancelRemoveDisciplina}
        />

        <Grid container spacing={24}>

          {/* TITULO */}
          <Grid item lg={12}>
            <Typography variant='h2'>{dis.cod} {dis.nome}</Typography>
          </Grid>

           {/* BOTOES */}
          <Grid item lg={12}>
            <Button onClick={() => { this.setState({ createAtividade: true }) }} variant="contained" color="primary" className={classes.button}>
              Nova atividade
              <AddIcon className={classes.rightIcon} />
            </Button>

            <Button onClick={() => { this.setState({ editDisciplina: true }) }} variant="contained" color="primary" className={classes.button}>
              Editar disciplina
              <EditIcon className={classes.rightIcon} />
            </Button>

            <Button onClick={() => { this.setState({ removeDisciplina: true }) }} variant="contained" color="secondary" className={classes.button}>
              Remover disciplina
              <DeleteIcon className={classes.rightIcon} />
            </Button>
          </Grid>

          {/* ATIVIDADES */}
          {atividadesGrid}

        </Grid>
      </Fragment>
    );
  }
};

export default withStyles(styles)(DisciplinaProf);