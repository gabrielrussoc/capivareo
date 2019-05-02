// @flow
import React, { Component } from "react"

import smart from '../../assets/images/smart.png'

type Props = {};

class Main extends Component<Props> {
  render () {
    return (
      <div className="row center">
        <img src={smart} />
      </div>
    );
  }
}

export default Main
