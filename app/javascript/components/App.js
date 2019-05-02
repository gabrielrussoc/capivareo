// @flow
import React, { Component } from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import Login from "./Login"
import Signup from "./Signup"
import { HashRouter, Route } from 'react-router-dom'

type Props = {};

type State = {};

class App extends Component<Props, State> {

  constructor () {
    super();
  }

  render () {
    return (
      <HashRouter>
        <Header color='orange' />
        <main>
          <div className="section no-pad-bot">
            <div className="container">
              <Route exact path="/" component={Main} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              {/* TODO: 404 page */}
            </div>
          </div>
        </main>
        <Footer color='orange' />
      </HashRouter>
    );
  }
}

export default App
