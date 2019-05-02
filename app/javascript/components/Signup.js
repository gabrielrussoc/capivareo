// @flow
import React, { Component } from "react"
import Button from "./Button"

type Props = {};

class Signup extends Component<Props> {
  render () {
    return (
      <React.Fragment>
        <h2>Registrar</h2>
        <form>
          <input id='email' placeholder='email'/>
          <input id='password' placeholder='password'/>
          <Button text='Enviar' color='orange' />
        </form>
     </React.Fragment>
    );
  }
}

export default Signup
