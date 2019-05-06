// @flow
import React, { Component } from "react"
import Button from "./Button"
import axios from 'axios'
import { Redirect } from 'react-router-dom'

type Props = {};

type State = {
  toLogin: boolean, 
};

class Signup extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      toLogin: false
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
      this.setState({
        toLogin: true
      });
    }).catch((err) => {
      // TODO: Tratar erros de registro
      console.log(err.response);
    })
  }

  render () {
    if (this.state.toLogin) {
      return <Redirect to='/' />
    }
    return (
      <React.Fragment>
        <h2>Registrar</h2>
        <form onSubmit={this.handleSignup} >
          <input name='nome' placeholder='Nome'/>
          <input name='nusp' placeholder='Número USP'/>
          <input name='email' placeholder='E-mail'/>
          <input name='password' placeholder='Senha'/>
          <Button text='Enviar' color='orange' />
        </form>
     </React.Fragment>
    );
  }
}

export default Signup
