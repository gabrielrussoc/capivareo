// @flow
import React, { Component } from "react"

import smart from '../../assets/images/smart.png'

import type { UserType } from '../types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { DashAluno, DashProfessor } from './dash';

const styles = theme => ({
  main: {
    [theme.breakpoints.up("lg")]: {
      width: 1170
    },
    padding: 2 * theme.spacing.unit,
  },
});


type Props = {
  currentUser: UserType,
  checkedLogin: boolean,
  classes: Object
};

class Main extends Component<Props> {
  render () {
    const { classes, currentUser }  = this.props;
    return (
      this.props.checkedLogin && 
      <Grid container justify="center">
        <Grid
          container
          className={classes.main}
          alignItems="center"
          justify="center"
        >
          <Grid item container justify='center' lg >
            {
              currentUser
              ? currentUser.is_prof
                ? <DashProfessor currentUser={currentUser} />
                : <DashAluno currentUser={currentUser} />
              : <img src={smart} />
            }
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Main)
