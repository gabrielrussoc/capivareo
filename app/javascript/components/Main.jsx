// @flow
import React, { Component } from "react"

import smart from '../../assets/images/smart.png'

import type { UserType } from '../types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { DashAluno, DashProfessor } from './dash';

type Props = {
  currentUser: UserType,
  checkedLogin: boolean,
  classes: Object
};

const styles = theme => ({
  logo: {
    margin: '0 auto',
    display: 'block',
  },
});

class Main extends Component<Props> {
  render () {
    const { classes, currentUser }  = this.props;
    return (
      this.props.checkedLogin && 
      currentUser
      ? currentUser.is_prof
        ? <DashProfessor currentUser={currentUser} />
        : <DashAluno currentUser={currentUser} />
      : <img src={smart} className={classes.logo} />
    );
  }
}

export default withStyles(styles)(Main);
