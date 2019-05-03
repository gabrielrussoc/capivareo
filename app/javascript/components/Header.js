// @flow
import React, { Component } from "react"
import Navbar from './Navbar'
import type { ColorType } from '../types'

type Props = {
  color: ColorType,
  currentUser: any,
}

class Header extends Component<Props> {
  render () {
    return (
      <header>
        <Navbar color={this.props.color} currentUser={this.props.currentUser} />
      </header>
    );
  }
}

export default Header
