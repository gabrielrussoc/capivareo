// @flow
import React, { Component } from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import Login from "./Login"
import Signup from "./Signup"
import { HashRouter, Route } from 'react-router-dom'
import axios from 'axios'
import type { UserType } from '../types'

type Props = {
  csrfToken: string;
};

type State = {
  currentUser: UserType;
};

class App extends Component<Props, State> {

  constructor (props: Props) {
    super();
    this.state = {
      currentUser: null
    }
    axios.defaults.headers.common['X-CSRF-Token'] = props.csrfToken;
  }

  setCurrentUser = (user: any) => {
    this.setState({
      currentUser: user
    })
  }

  componentDidMount = () => {
    axios.post('/users/check', {
    }).then((res) => {
      const user = res.data;
      this.setCurrentUser(user);
    }).catch((err) => {
      this.setCurrentUser(null);
    });
  }

  render () {
    return (
      <HashRouter>
        <Header color='orange' currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} />
        <main>
          <div className="section no-pad-bot">
            <div className="container">
              <Route exact path="/" component={Main} />
              {/* A sintaxe diferente eh necessaria pois o componente Login tem
              algumas props. Passar a prop direto para o Route eh ignorado pelo React. */}
              <Route path="/login" render={(props) => <Login {...props} setCurrentUser={this.setCurrentUser} /> } />
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
