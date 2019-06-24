// @flow
import React, { Component, Fragment } from "react"
import {Link} from "react-router-dom"
import axios from 'axios'
import type { UserType } from '../../types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
    const sessionCookieName = '_capivareo_session' 
    document.cookie = sessionCookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.props.setCurrentUser(null);
    axios.delete('/users/sign_out.json', {});
  }

  render () {
      return (
        <Fragment>
          <Typography variant="button">
            Olá, {shortName(this.props.currentUser)}!
            <Button onClick={this.handleLogout} component={Link} to="/">Sair</Button>
          </Typography>
      </Fragment>
      )
  }
}

export default UserInfo
