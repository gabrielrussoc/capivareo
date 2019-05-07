// @flow
import React, { Component } from "react"
import Button from "./Button"
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Alert from "./Alert"

type Props = {
  setCurrentUser: Function;
};

type State = {
  toHome: boolean,
  invalidCredentials: boolean
};

class Login extends Component<Props, State> {

  constructor () {
    super();
    this.state = {
      toHome: false,
      invalidCredentials: false
    }
  }

  handleLogin = (event: any) => {
    event.preventDefault();

    this.setState({
      toHome: false,
      invalidCredentials: false
    });

    const target = event.target;
    const email = target.email.value;
    const password = target.password.value;

    axios.post('/users/sign_in.json', {
      user: {
        email: email,
        password: password,
        remember_me: 1,
      }
    }).then((res) => {
      const user = res.data;
      this.props.setCurrentUser(user);
      this.setState({
        invalidCredentials: false,
        toHome: true,
      })
    }).catch((err) => {
      this.setState({
        toHome: false,
        invalidCredentials: true
      })
    })
  }

  render () {
    if (this.state.toHome) {
      return <Redirect to="/" />
    }
    return (
      <React.Fragment>
        {this.state.invalidCredentials && <Alert text='E-mail ou senha inválidos.' />}
        <h2>Login</h2>
        <form onSubmit={this.handleLogin} >
          <input type='email' name='email' placeholder='E-mail'/>
          <input type='password' name='password' placeholder='Senha'/>
          <Button text='Entrar' color='orange' />
        </form>
     </React.Fragment>
    );
  }
}

export default Login
