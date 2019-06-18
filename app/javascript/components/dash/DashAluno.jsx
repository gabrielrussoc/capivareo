// @flow
import React, { Component } from "react"
import { Link } from "react-router-dom"

import SearchDisciplina from './SearchDisciplina';
import QuickView from './QuickView';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'

import semestres from '../../semestres';
import type { DisciplinaProfType } from '../../types';

import axios from 'axios';

type Props = {
  classes: Object
};

type State = {
  quickView: boolean,
  semestre: Date,
  addDisciplina: boolean,
  didFetch: boolean,
  disciplinas: Array<DisciplinaProfType>,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    alignContent: 'center'
  },
  card: {
    textAlign: 'center',
  },
  button: {
    margin: 2 * theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class DashAluno extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      quickView: false,
      semestre: semestres[0],
      addDisciplina: false,
      didFetch: false,
      disciplinas: [],
    }
  }

  handleQuickView = () => {
    this.setState((state: State, props: Props) => ({
      quickView: !state.quickView,
    }));
  }

  handleSemestre = (event: any) => {
    this.setState({
      semestre: event.target.value,
    })
  }

  handleAddDisciplina = () => {
    this.setState({
      addDisciplina: true,
    })
  }

  handleDoneAddDisciplina = () => {
    this.setState({
      addDisciplina: false,
    })
  }

  handleEnroll = (disciplinaId: number) => {
    this.setState((prevState: State) => {
      let idx = prevState.disciplinas.findIndex((d) => d.id === disciplinaId);
      prevState.disciplinas[idx].enrolled = true;
      return {
        disciplinas: prevState.disciplinas,
      }
    })
  }

  fetchDisciplinas = () => {
    this.setState({
      didFetch: false,
    })
    axios.get('/disciplinas', {
      params: {
        semestre: this.state.semestre
      }
    }).then((res) => {
        const disciplinas = res.data;
        this.setState({
          didFetch: true,
          disciplinas: disciplinas,
        })
      }).catch((err) => {
        console.log(err.data);
        // TODO: Handle errors
      });
  }

  componentDidMount = () => {
    this.fetchDisciplinas();
  }

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (prevState.semestre !== this.state.semestre)
      this.fetchDisciplinas();
  } 

  render () {
    const classes = this.props.classes;
    const semestresItens = semestres.map((sem, idx) => 
      <MenuItem key={idx} value={sem}>{sem.getFullYear()}-{(~~(sem.getMonth()/6)) + 1}</MenuItem>
    );
    const disciplinasGrid = this.state.disciplinas
      .filter(dis => dis.enrolled)
      .map((dis, idx) =>
          <Grid item xs={6} key={idx}>
            <Card className={classes.card}>
              <CardActionArea component={Link} to={`/disciplinas/${dis.id}`}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {dis.cod} {dis.nome}
                  </Typography>
                  <Typography component="p">
                    {dis.user.nome}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
      );
    return (
      <div className={classes.root}>
        <SearchDisciplina 
          open={this.state.addDisciplina} 
          handleDoneAddDisciplina={this.handleDoneAddDisciplina}
          disciplinas={this.state.disciplinas}
          didFetch={this.state.didFetch}
          handleEnroll={this.handleEnroll}
        />
        <Typography variant='h2'>Minhas disciplinas</Typography>
        
        <Grid container spacing={24} justify='center'>
          
          <Grid item xs={8}>
            <Button onClick={this.handleAddDisciplina} variant="contained" color="primary" className={classes.button}>
              Adicionar disciplina
              <AddIcon className={classes.rightIcon} />
            </Button>
          </Grid>

          <Grid item xs={2}>
            <FormControl className={classes.formControl} fullWidth>
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

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={this.state.quickView}
                  onChange={this.handleQuickView}
                  value="quickView"
                />
              }
              label="Visão geral"
            />
          </Grid>
          {this.state.quickView ? <QuickView semestre={this.state.semestre }/> :  disciplinasGrid}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(DashAluno);