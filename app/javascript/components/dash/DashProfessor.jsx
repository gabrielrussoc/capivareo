// @flow
import React, { Component, Fragment } from "react"

import CreateDisciplina from './CreateDisciplina';
import semestres from '../../semestres';

import type { UserType, DisciplinaType } from '../../types';

import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import axios from 'axios';

type Props = {
  currentUser: UserType,
  classes: Object,
};

type State = {
  disciplinas: Array<DisciplinaType>,
  didFetch: boolean,
  newDisciplina: boolean,
  semestre: Date,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  button: {
    margin: 2 * theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  card: {
    textAlign: 'center',
  },
});

class DashProfessor extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      disciplinas: [],
      didFetch: false,
      newDisciplina: false,
      semestre: semestres[0],
    }
  };

  listDisciplinas = () => {
    this.setState({
      didFetch: false,
    })
    axios.get('/mydisciplinas', {
      params: {
        semestre: this.state.semestre
      }
    }).then((res) => {
        this.setState({
          disciplinas: res.data,
          didFetch: true,
        })
      })
      .catch((err) => {
        // TODO: handle errors
        console.log(err.data);
      });
  };

  componentDidMount = () => {
    this.listDisciplinas();
  }

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (prevState.semestre !== this.state.semestre)
      this.listDisciplinas();
  } 

  handleCancelDisciplina = () => {
    this.setState({
      newDisciplina: false,
    });
  }

  handleClickAdd = () => {
    this.setState({
      newDisciplina: true,
    })
  }

  handleNewDisciplina = (event: any) => {
    event.preventDefault();

    const target = event.target;

    const nome = target.nome.value;
    const cod = target.cod.value;
    const descr = target.descr.value;
    const semestre = target.semestre.value;

    axios.post('/disciplinas', {
      disciplina: {
        nome: nome,
        cod: cod,
        descr: descr,
        semestre: semestre,
        user_id: this.props.currentUser.id,
      }
    }).then((res) => {
      this.setState({
        newDisciplina: false,
      })
      this.listDisciplinas();
    }).catch((err) => {
      console.log(err.data);
    });
  }

  handleSemestre = (event: any) => {
    this.setState({
      semestre: event.target.value,
    })
  }

  render () {
    const { classes } = this.props;

    const disciplinasGrid = this.state.disciplinas
    .map((dis, idx) =>
        <Grid item xs={6} key={idx}>
          <Card className={classes.card}>
            <CardActionArea component={Link} to={`/disciplinas/${dis.id}`}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {dis.cod} {dis.nome}
                </Typography>
                <Typography component="p">
                  {dis.descr}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
    );

    const semestresItens = semestres.map((sem, idx) => 
      <MenuItem key={idx} value={sem}>{sem.getFullYear()}-{(~~(sem.getMonth()/6)) + 1}</MenuItem>
    );

    return (
      <Fragment>
        <CreateDisciplina 
          open={this.state.newDisciplina} 
          handleCancelDisciplina={this.handleCancelDisciplina}
          handleNewDisciplina={this.handleNewDisciplina}
        />

        
        <Grid container spacing={24}>

          <Grid item lg={12}>
            <Typography variant='h2'>Minhas disciplinas</Typography>
          </Grid>

          <Grid item lg={10}>
            <Button onClick={this.handleClickAdd} variant="contained" color="primary" >
              Nova disciplina
              <AddIcon className={classes.rightIcon} />
            </Button>
          </Grid>
          <Grid item lg={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="semestre">Semestre</InputLabel>
              <Select
                value={this.state.semestre}
                onChange={this.handleSemestre}
                input={<Input name="semestre" id="semestre" />}
              >
                {semestresItens}
              </Select>
            </FormControl>
          </Grid>

            {!this.state.didFetch
              ? <CircularProgress />
              : disciplinasGrid
            }
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(DashProfessor);;