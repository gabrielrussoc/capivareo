// @flow

import React, { Component, Fragment } from 'react';

import type { UserType, AtividadeType, DisciplinaType, NotaType } from '../../types';
import EditAtividade from './EditAtividade';
import RemoveAtividade from './RemoveAtividade';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Link as RouterLink } from 'react-router-dom'
import Breadcrumbs from '@material-ui/lab/Breadcrumbs'
import Link from '@material-ui/core/Link'

import axios from 'axios';

type Props = {
  match: Object, // url params
  currentUser: UserType,
  classes: Object,
}

type State = {|
  at: ?AtividadeType,
  dis: ?DisciplinaType,
  alunos: Array<UserType>,
  notas: Array<NotaType>,
  editAtividade: boolean,
  removeAtividade: boolean,
  isCorrigindo: boolean,
  errors: Object,
|}

const styles = theme => ({
  nota: {
    width: 30,
  },
  button: {
    margin: 1 * theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const LinkRouter = props => <Link {...props} component={RouterLink} />

class Atividade extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      at: null,
      dis: null,
      alunos: [],
      notas: [],
      editAtividade: false,
      removeAtividade: false,
      isCorrigindo: false,
      errors: {},
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
        notas: res.data.notas,
      })
    }).catch(err => {
      console.log(err);
      // TODO: handle errors
    })
  }

  componentDidMount = () => {
    this.fetchData();
  }

  handleDoneEditAtividade = (didEdit: boolean) => {
    this.setState({
      editAtividade: false,
    })
    if (didEdit)
      this.fetchData();
  }

  handleDoneRemoveAtividade = () => {
    this.setState({
      removeAtividade: false,
    })
  }

  handleCorrigir = () => {
    this.setState((prevState: State) => ({
      isCorrigindo: !prevState.isCorrigindo
    }));
  }

  saveNotas = (event: any) => {
    event.preventDefault();
    const params = {
      atividade_id: this.props.match.params.id,
      notas: Array.from(event.target.notas).map((nota) => ({
        aluno_id: nota.dataset.alunoId,
        nota: nota.value,
    }))};
    axios.post('/notas', params)
      .then(res => {
        this.setState({
          isCorrigindo: false,
          errors: res.data,
        })
        this.fetchData();
      }).catch(err => {
        console.log(err);
        // TODO: handle errors
      });
  }

  render() {

    if(!this.state.at || !this.state.dis)
      return <CircularProgress />

    const { at, dis, alunos } = this.state;
    const { classes } = this.props;

    const notas = this.state.notas.reduce((notas: Object, nota: NotaType) => {
      notas[nota.user_id] = nota
      return notas
    }, {});

    return (
      <Fragment>
        <EditAtividade
          at={at}
          open={this.state.editAtividade}
          handleClose={this.handleDoneEditAtividade}
        />
        <RemoveAtividade
          at={at}
          dis={dis}
          open={this.state.removeAtividade}
          handleClose={this.handleDoneRemoveAtividade}
        />
        <Grid container spacing={24}>

          <Grid item lg={12}>
            <Breadcrumbs aria-label="Breadcrumb">
              <LinkRouter color="inherit" to="/">
                Minhas disciplinas
              </LinkRouter>
              <LinkRouter color="inherit" to={`/disciplinas/${dis.id}`}>
                {dis.cod}
              </LinkRouter>
              <Typography color="textPrimary">{at.nome}</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item lg={12}>
            <Typography variant='h2'>{at.nome}</Typography>
            <Typography variant='h5'>{dis.cod} {dis.nome}</Typography>
            <Typography variant='subtitle1'>{at.desc}</Typography>
          </Grid>

          <Grid item lg={10}>
            <Button onClick={() => { this.setState({ editAtividade: true }) }} variant="contained" color="primary" className={classes.button}>
              Editar atividade
              <EditIcon className={classes.rightIcon} />
            </Button>

            <Button onClick={() => { this.setState({ removeAtividade: true }) }} variant="contained" color="secondary" className={classes.button}>
              Remover atividade
              <DeleteIcon className={classes.rightIcon} />
            </Button>
          </Grid>
          <Grid item lg={2}>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={this.state.isCorrigindo}
                  onChange={this.handleCorrigir}
                />
              }
              label="Corrigir"
            />
          </Grid>

          <Grid item lg={12}>
            <form onSubmit={this.saveNotas}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>NUSP</TableCell>
                    <TableCell>Nota</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {alunos.map((aluno) => {
                    const nota = notas[aluno.id];
                    return (
                    <TableRow key={aluno.nusp}>
                      <TableCell component="th" scope="row">
                        {aluno.nome}
                      </TableCell>
                      <TableCell>{aluno.nusp}</TableCell>
                      <TableCell>
                        <Input 
                          disabled={!this.state.isCorrigindo}
                          className={classes.nota} 
                          defaultValue={nota ? nota.nota : null} 
                          name="notas"
                          error={this.state.errors[aluno.id]}
                          inputProps={
                            {
                              'data-aluno-id': aluno.id,
                            }
                          }
                        /> 
                          / 100
                      </TableCell>
                    </TableRow>
                  )})}
                </TableBody>
              </Table>
              <Button 
                type="submit"
                variant="contained" 
                color="primary" 
                className={classes.button}
                disabled={!this.state.isCorrigindo}
              >
                Salvar correção
                <SaveIcon className={classes.rightIcon} />
              </Button>
            </form>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
};

export default withStyles(styles)(Atividade);