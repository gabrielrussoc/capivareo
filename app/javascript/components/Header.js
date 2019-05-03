// @flow
import React, { Component } from "react"
import Navbar from './Navbar'
import type { ColorType } from '../types'

type Props = {
  color: ColorType,
  currentUser: any,
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
