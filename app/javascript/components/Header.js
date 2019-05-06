// @flow
import React, { Component } from "react"
import Navbar from './Navbar'
import type { ColorType, UserType } from '../types'

type Props = {
  color: ColorType,
  currentUser: UserType,
  setCurrentUser: Function,
}

class Header extends Component<Props> {
  render () {
    return (
      <header>
        <Navbar color={this.props.color} currentUser={this.props.currentUser} setCurrentUser={this.props.setCurrentUser} />
      </header>
    );
  }
}

export default Header
