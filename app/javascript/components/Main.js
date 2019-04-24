// @flow
import React, { Component } from "react"

import smart from '../../assets/images/smart.png'

type Props = {}

class Main extends Component<Props> {
  render () {
    return (
      <main>
        <div class="section no-pad-bot">
          <div class="container">
            <div class="row center">
              <img src={smart} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Main
