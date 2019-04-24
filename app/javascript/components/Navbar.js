// @flow
import React, { Component } from "react"
import Logo from './Logo';
import LoginArea from './LoginArea';
import type { ColorType } from '../types';

type Props = {
  color: ColorType;
}

class Navbar extends Component<Props> {
  render () {
    return (
      <nav className={this.props.color}>
        <div className='nav-wrapper container'>
          <Logo />
          <LoginArea />
        </div>
      </nav>
    );
  }
}

export default Navbar
