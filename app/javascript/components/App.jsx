// @flow
import React, { Component } from "react"
import Main from "./Main"
import Navbar from './navbar'
import Footer from "./Footer"
import Login from "./Login"
import Signup from "./Signup"
import { BrowserRouter, Route } from 'react-router-dom'
import axios from 'axios'
import type { UserType } from '../types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'

type Props = {
  csrfToken: string;
};

type State = {
  currentUser: UserType,
  checkedLogin: boolean,
};

class App extends Component<Props, State> {

  constructor (props: Props) {
    super();
    this.state = {
      currentUser: null,
      checkedLogin: false,
    }
    // axios.defaults.headers.common['X-CSRF-Token'] = props.csrfToken;
  }

  setCurrentUser = (user: UserType) => {
    this.setState({
      currentUser: user,
      checkedLogin: true,
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
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar checkedLogin={this.state.checkedLogin} currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} />
          <Route exact path="/" component={Main} />
          {/* A sintaxe diferente eh necessaria pois o componente Login tem
          algumas props. Passar a prop direto para o Route eh ignorado pelo React. */}
          <Route path="/login" render={(props) => <Login {...props} setCurrentUser={this.setCurrentUser} /> } />
          <Route path="/signup" render={(props) => <Signup {...props} setCurrentUser={this.setCurrentUser} /> } />
          {/* TODO: 404 page */}
          <Footer color='orange' />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App
