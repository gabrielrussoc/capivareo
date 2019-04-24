// @flow
import React, { Component } from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"

type Props = {};

class Home extends Component<Props> {
  render () {
    return (
      <React.Fragment>
        <Header color='orange' />
        <Main />
        <Footer color='orange' />
      </React.Fragment>
    );
  }
}

export default Home
