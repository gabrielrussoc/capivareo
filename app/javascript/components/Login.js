// @flow
import React, { Component } from "react"
import Button from "./Button"

type Props = {};

class Login extends Component<Props> {
  render () {
    return (
      <React.Fragment>
        <h2>Login</h2>
        <form>
          <input id='email' placeholder='email'/>
          <input id='password' placeholder='password'/>
          <Button text='Entrar' color='orange' />
        </form>
     </React.Fragment>
    );
  }
}

export default Login
