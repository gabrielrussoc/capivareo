// @flow
import React, { Component } from "react"

import type { UserType } from '../types';

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import { DashAluno, DashProfessor } from './dash';
import Landing from './Landing';

type Props = {
  currentUser: UserType,
  checkedLogin: boolean,
  classes: Object
};

const styles = theme => ({
});

class Main extends Component<Props> {
  render () {
    const { classes, currentUser, checkedLogin }  = this.props;
    if (!checkedLogin)
      return <CircularProgress className={classes.center} />
    return (
      (currentUser
      ? currentUser.is_prof
        ? <DashProfessor currentUser={currentUser} />
        : <DashAluno currentUser={currentUser} />
      : <Landing />)
    );
  }
}

export default withStyles(styles)(Main);
