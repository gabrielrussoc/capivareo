// @flow
import React, { Component } from "react"
import Logo from './Logo';
import LoginArea from './LoginArea';
import type { ColorType } from '../types';

type Props = {
  color: ColorType,
  currentUser: any,
  setCurrentUser: Function,
}

class Navbar extends Component<Props> {
  render () {
    return (
      <nav className={this.props.color}>
        <div className='nav-wrapper container'>
          <Logo />
          <LoginArea currentUser={this.props.currentUser} setCurrentUser={this.props.setCurrentUser} />
        </div>
      </nav>
    );
  }
}

export default Navbar
