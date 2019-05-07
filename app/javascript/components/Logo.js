// @flow
import React, { Component } from "react"
import { Link } from "react-router-dom"

type Props = {};

class Logo extends Component<Props> {
  render () {
    return (
      <Link to='/' className="brand-logo">Capivareo</Link>
    );
  }
}

export default Logo
