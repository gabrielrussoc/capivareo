// @flow
import React, { Component } from "react"
import Card from './Card'

import smart from '../../assets/images/smart.png'

type Props = {};

class Main extends Component<Props> {
  render () {
    return (
      <div className="row center">
        <div className="row">
          <div className="col s6">
            <Card title='Esq' caption='trololo' icon='create' />
          </div>
          <div className="col s6">
            <Card title='Dir' caption='trololo' icon='format_list_bulleted' />
          </div>
        </div>
      </div>
    );
  }
}

export default Main
