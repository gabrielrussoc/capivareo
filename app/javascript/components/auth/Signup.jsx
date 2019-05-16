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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormHelperText from '@material-ui/core/FormHelperText';

type Props = {
  setCurrentUser: Function,
  classes: Object,
};

type State = {
  toLogin: boolean,
  errors: Object,
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

class Signup extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      toLogin: false,
      errors: {},
    }
  }

  handleSignup = (event: any) => {
    event.preventDefault();

    this.setState({
        toLogin: false,
        errors: {},
      });

    const target = event.target;

    const email = target.email.value;
    const password = target.password.value;
    const nome = target.nome.value;
    const nusp = target.nusp.value;
    const is_prof = target.is_prof.checked;

    axios.post('/users.json', {
      user: {
        nome: nome,
        nusp: nusp,
        email: email,
        password: password,
        is_prof: is_prof
      }
    }).then((res) => {
      const user = res.data;
      this.props.setCurrentUser(user);
      this.setState({
        toLogin: true,
        errors: {},
      });
    }).catch((err) => {
      console.log(err.response.data.errors);
      this.setState({
        toLogin: false,
        errors: err.response.data.errors,
      })
    })
  }

  render () {
    if (this.state.toLogin) {
      return <Redirect to='/' />
    }
    const classes = this.props.classes;
    return (
     <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar
          </Typography>
          <form className={classes.form} onSubmit={this.handleSignup}>
            <FormControl margin="normal" required fullWidth error={this.state.errors.nome}>
              <InputLabel htmlFor="nome">Nome completo</InputLabel>
              <Input id="nome" name="nome" autoComplete="nome-signup" autoFocus />
            </FormControl>
            {this.state.errors.nome && <FormHelperText error>{this.state.errors.nome[0]}</FormHelperText>}

            <FormControl margin="normal" required fullWidth error={this.state.errors.nusp}>
              <InputLabel htmlFor="nusp">Número USP</InputLabel>
              <Input id="nusp" name="nusp" autoComplete="nusp-signup" />
            </FormControl>
            {this.state.errors.nusp && <FormHelperText error>{this.state.errors.nusp[0]}</FormHelperText>}

            <FormControl margin="normal" required fullWidth error={this.state.errors.email}>
              <InputLabel htmlFor="email">Endereço de e-mail</InputLabel>
              <Input id="email" name="email" autoComplete="email-signup" />
            </FormControl>
            {this.state.errors.email && <FormHelperText error>{this.state.errors.email[0]}</FormHelperText>}

            <FormControl margin="normal" required fullWidth error={this.state.errors.password}>
              <InputLabel htmlFor="password">Senha</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password-signup" />
            </FormControl>
            {this.state.errors.password && <FormHelperText error>{this.state.errors.password[0]}</FormHelperText>}
            
            <FormControlLabel
              control={<Checkbox name="is_prof" color="primary" />}
              label="Professor"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrar
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Signup);
