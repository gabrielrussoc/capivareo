// @flow
import React, { Component } from "react"
import Main from "./Main"
import Navbar from './navbar'
import Footer from "./footer"
import { Login, Signup } from "./auth"
import { HashRouter, Route } from 'react-router-dom'
import axios from 'axios'
import type { UserType } from '../types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Disciplina, Atividade } from './dash';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  csrfToken: string,
  classes: Object,
};

type State = {
  currentUser: ?UserType,
  checkedLogin: boolean,
};

const styles = theme => ({
  main: {
    [theme.breakpoints.up("lg")]: {
      width: 1170
    },
    padding: 2 * theme.spacing.unit,
    margin: '0 auto',
  },
});

class App extends Component<Props, State> {

  constructor (props: Props) {
    super();
    this.state = {
      currentUser: null,
      checkedLogin: false,
    }
    // axios.defaults.headers.common['X-CSRF-Token'] = props.csrfToken;
  }

  setCurrentUser = (user: ?UserType) => {
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
        <CssBaseline />
        <HashRouter>
          <Navbar checkedLogin={this.state.checkedLogin} currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} />
          <main className={this.props.classes.main}>
            <Route exact path="/" render={(props) => <Main {...props} currentUser={this.state.currentUser} checkedLogin={this.state.checkedLogin} /> } />
            {/* A sintaxe diferente eh necessaria pois o componente Login tem
            algumas props. Passar a prop direto para o Route eh ignorado pelo React. */}
            <Route path="/login" render={(props) => <Login {...props} setCurrentUser={this.setCurrentUser} /> } />
            <Route path="/signup" render={(props) => <Signup {...props} setCurrentUser={this.setCurrentUser} /> } />
            <Route path="/disciplinas/:id" render={(props) => <Disciplina {...props} currentUser={this.state.currentUser} /> } />
            <Route path="/atividades/:id" render={(props) => <Atividade {...props} currentUser={this.state.currentUser} /> } />
            {/* TODO: 404 page */}
          </main>
          <Footer />
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
