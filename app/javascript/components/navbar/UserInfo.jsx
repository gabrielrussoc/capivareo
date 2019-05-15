// @flow
import React, { Component, Fragment } from "react"
import {Link} from "react-router-dom"
import axios from 'axios'
import type { UserType } from '../../types'
import Button from '@material-ui/core/Button'

type Props = {
  currentUser: UserType,
  setCurrentUser: Function,
};

function shortName(user: UserType): string {
  if (user !== null)
    return (user.is_prof ? 'Prof. ' : '') + user.nome.split(' ')[0]
  return ''
}

class UserInfo extends Component<Props> {

  handleLogout = () => {
    axios.delete('/users/sign_out.json', {}).then(() => {
      this.props.setCurrentUser(null);
    });
  }

  render () {
      return (
        <Fragment>
          Olá, {shortName(this.props.currentUser)}!
          <Button onClick={this.handleLogout} component={Link} to="/">Sair</Button>
      </Fragment>
      )
  }
}

export default UserInfo
