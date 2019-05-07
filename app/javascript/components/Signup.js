// @flow
import React, { Component } from "react"
import Button from "./Button"
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Alert from './Alert'

type Props = {
  setCurrentUser: Function
};

type State = {
  toLogin: boolean,
  errors: Object,
};

class Signup extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      toLogin: false,
      errors: {},
    }
  }

  handleSignup = (event: any) => {
    event.preventDefault();
    const target = event.target;

    const email = target.email.value;
    const password = target.password.value;
    const nome = target.nome.value;
    const nusp = target.nusp.value;

    axios.post('/users.json', {
      user: {
        nome: nome,
        nusp: nusp,
        email: email,
        password: password
      }
    }).then((res) => {
      const user = res.data;
      this.props.setCurrentUser(user);
      this.setState({
        toLogin: true,
        errors: {},
      });
    }).catch((err) => {
      this.setState({
        toLogin: false,
        errors: err.response.data.errors,
      })
    })
  }

  render () {
    if (this.state.toLogin) {
      return <Redirect to='/' />
    }
    const errors = Object.entries(this.state.errors).map((err, idx) =>
      <Alert key={idx} text={err.join(': ')} />
    );
    return (
      <React.Fragment>
        {errors}
        <h2>Registrar</h2>
        <form onSubmit={this.handleSignup} >
          <input type='text' name='nome' placeholder='Nome'/>
          <input type='text' name='nusp' placeholder='Número USP'/>
          <input type='email' name='email' placeholder='E-mail'/>
          <input type='password' name='password' placeholder='Senha'/>
          <Button text='Enviar' color='orange' />
        </form>
     </React.Fragment>
    );
  }
}

export default Signup
