// @flow
import React, { Component } from "react"
import Button from "./Button"
import axios from 'axios'

type Props = {
  setCurrentUser: Function;
  history: any;
};

type State = {
  invalidCredentials: boolean;
};

class Login extends Component<Props, State> {

  constructor () {
    super();
    this.state = {
      invalidCredentials: false
    }
  }

  handleLogin = (event: any) => {
    event.preventDefault();
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
      this.props.history.push('/');
    }).catch((err) => {
      this.setState({
        invalidCredentials: true
      })
    })
  }

  render () {
    return (
      <React.Fragment>
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
