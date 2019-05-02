// @flow
import React, { Component } from "react"
import Navbar from './Navbar'
import type { ColorType } from '../types'

type Props = {
  color: ColorType,
}

class Header extends Component<Props> {
  render () {
    return (
      <header>
        <Navbar color={this.props.color} />
      </header>
    );
  }
}

export default Header
