// @flow
import React, { Component } from "react"
import {Link} from "react-router-dom"

type Props = {};

class LoginArea extends Component<Props> {
  render () {
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/login">Entrar</Link></li>
        <li><Link to="/signup">Registrar</Link></li>
      </ul>
    );
  }
}

export default LoginArea
