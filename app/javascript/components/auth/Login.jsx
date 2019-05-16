// @flow
import React, { Component } from "react"
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

type Props = {
  setCurrentUser: Function,
  classes: Object
};

type State = {
  toHome: boolean,
  invalidCredentials: boolean
};

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component<Props, State> {

  constructor () {
    super();
    this.state = {
      toHome: false,
      invalidCredentials: false
    }
  }

  handleLogin = (event: any) => {
    event.preventDefault();

    this.setState({
      toHome: false,
      invalidCredentials: false
    });

    const target = event.target;
    const email = target.email.value;
    const password = target.password.value;

    axios.post('/users/sign_in.json', {
      user: {
        email: email,
        password: password,
        remember_me: 1,
      }
    }).then((res) => {
      const user = res.data;
      this.props.setCurrentUser(user);
      this.setState({
        invalidCredentials: false,
        toHome: true,
      })
    }).catch((err) => {
      this.setState({
        toHome: false,
        invalidCredentials: true
      })
    })
  }

  render () {
    if (this.state.toHome) {
      return <Redirect to="/" />
    }
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={this.handleLogin}>
            <FormControl margin="normal" required fullWidth error={this.state.invalidCredentials}>
              <InputLabel htmlFor="email">Endereço de e-mail</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth error={this.state.invalidCredentials}>
              <InputLabel htmlFor="password">Senha</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}


export default withStyles(styles)(Login);
