// @flow
import React, { Component } from "react"
import type { UserType } from '../../types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import UserInfo from './UserInfo';
import LoginButtons from './LoginButtons';

type Props = {
  currentUser: UserType,
  setCurrentUser: Function,
  checkedLogin: boolean
}

class Navbar extends Component<Props> {
  render () {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" style={{flexGrow: 1, textDecoration:'none'}} component={Link} to='/' >
            Capivareo
          </Typography>
          {this.props.checkedLogin &&
            (this.props.currentUser !== null
              ? <UserInfo currentUser={this.props.currentUser} setCurrentUser={this.props.setCurrentUser}/>
              : <LoginButtons /> 
            )
          }
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar
