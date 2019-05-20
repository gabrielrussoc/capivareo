// @flow
import React, { Component, Fragment } from "react"

import CreateDisciplina from './CreateDisciplina';

import type { UserType, DisciplinaType } from '../../types';

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import axios from 'axios';

type Props = {
  currentUser: UserType,
  classes: Object,
};

type State = {
  disciplinas: Array<DisciplinaType>,
  didFetch: boolean,
  newDisciplina: boolean,
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
});

class DashProfessor extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      disciplinas: [],
      didFetch: false,
      newDisciplina: false,
    }
  };

  listDisciplinas = () => {
    this.setState({
      didFetch: false,
    })
    axios.get('/mydisciplinas')
      .then((res) => {
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

  render () {
    if (!this.state.didFetch) {
      return <CircularProgress />;
    }
    const { classes } = this.props;

    const disciplinas = this.state.disciplinas.map((dis, idx) =>
      <ExpansionPanel key={idx}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{dis.cod} - {dis.nome}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {dis.descr}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );

    return (
      <Fragment>
        <Button onClick={this.handleClickAdd} variant="contained" color="primary" className={classes.button}>
          Nova disciplina
          <AddIcon className={classes.rightIcon} />
        </Button>

        <div className={classes.root}>
          <CreateDisciplina 
            open={this.state.newDisciplina} 
            handleCancelDisciplina={this.handleCancelDisciplina}
            handleNewDisciplina={this.handleNewDisciplina}
          />
          {disciplinas}
          {/* TODO: handle empty array */}
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(DashProfessor);;