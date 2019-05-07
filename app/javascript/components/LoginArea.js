// @flow
import React, { Component } from "react"
import {Link} from "react-router-dom"
import axios from 'axios'
import type { UserType } from '../types'

type Props = {
  currentUser?: UserType,
  setCurrentUser: Function,
};

function primeiroNome(nome: string): string {
  return nome.split(' ')[0]
}

class LoginArea extends Component<Props> {

  handleLogout = () => {
    axios.delete('/users/sign_out.json', {}).then(() => {
      this.props.setCurrentUser(null);
    });
  }

  render () {
    if (this.props.currentUser === undefined)
      return null;

    if (this.props.currentUser !== null)
      return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a>Olá, {primeiroNome(this.props.currentUser.nome)}!</a></li>
        <li><Link to="/" onClick={this.handleLogout}>Sair</Link></li>
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
