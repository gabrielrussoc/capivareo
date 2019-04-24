// @flow
import React, { Component } from "react"

type Props = {};

class LoginArea extends Component<Props> {
  render () {
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="#">Entrar</a></li>
        <li><a href="#">Registrar</a></li>
      </ul>
    );
  }
}

export default LoginArea
