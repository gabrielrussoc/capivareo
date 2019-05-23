// @flow

import React, { Component } from 'react';

import axios from 'axios';

import type { DisciplinaType } from '../../types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

type Props = {
  id: number,
  classes: Object,
}

type State = {
  dis: ?DisciplinaType,
}

const styles = theme => ({
  button: {
    margin: 1 * theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class DisciplinaProf extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      dis: null,
    }
  }

  componentDidMount = () => {
    axios.get('/disciplina', {
      params: {
        id: this.props.id
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

  render() {
    if (!this.state.dis) {
      return <CircularProgress />
    }
    const { classes } = this.props;
    const { dis } = this.state;
    return (
      <Grid container>
        <Grid item lg={12}>
          <Typography variant='h2'>{dis.cod} {dis.nome}</Typography>
        </Grid>

        <Grid item lg={12}>
          <Button onClick={() => {}} variant="contained" color="primary" className={classes.button}>
            Nova atividade
            <AddIcon className={classes.rightIcon} />
          </Button>

          <Button onClick={() => {}} variant="contained" color="primary" className={classes.button}>
            Editar disciplina
            <EditIcon className={classes.rightIcon} />
          </Button>

          <Button onClick={() => {}} variant="contained" color="secondary" className={classes.button}>
            Remover disciplina
            <DeleteIcon className={classes.rightIcon} />
          </Button>
        </Grid>


      </Grid>
    );
  }
};

export default withStyles(styles)(DisciplinaProf);