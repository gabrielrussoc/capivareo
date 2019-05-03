// @flow
import React, { Component } from "react"
import {Link} from "react-router-dom"

type Props = {
  currentUser: any,
};

class LoginArea extends Component<Props> {
  render () {
    if (this.props.currentUser !== null)
      return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>Olá, {this.props.currentUser.id}!</li>
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
