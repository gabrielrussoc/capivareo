// @flow
import React, { Component } from "react"
import {Link} from "react-router-dom"
import axios from 'axios'

type Props = {
  currentUser: any,
  setCurrentUser: Function,
};

class LoginArea extends Component<Props> {

  handleLogout = () => {
    axios.delete('/users/sign_out.json', {}).then(() => {
      this.props.setCurrentUser(null);
    });
  }

  render () {
    if (this.props.currentUser !== null)
      return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a>Olá, {this.props.currentUser.id}!</a></li>
        <li><a onClick={this.handleLogout}>Sair</a></li>
      </ul>
      )
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/login">Entrar</Link></li>
        <li><Link to="/signup">Registrar</Link></li>
      </ul>
    );
  }
}

export default LoginArea
