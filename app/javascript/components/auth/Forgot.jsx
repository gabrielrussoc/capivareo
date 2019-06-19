// @flow
import React, { Component, Fragment } from "react"
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';

type Props = {
  classes: Object
};

type State = {
  invalidEmail: boolean,
  error: string,
  emailSent: boolean,
  email: string,
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
  desc: {
    marginTop: theme.spacing.unit,
  },
});

class Forgot extends Component<Props, State> {

  constructor () {
    super();
    this.state = {
      invalidEmail: false,
      error: '',
      emailSent: false,
      email: '',
    }
  }

  handleForgot = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    axios.post('/users/password.json', {
      user: {
        email: email,
      }
    }).then(res => {
      this.setState({
        emailSent: true,
        email: email,
      })
    }).catch(err => {
      this.setState({
        invalidEmail: true,
        error: err.response.data.errors.email[0],
      })
    });
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SettingsBackupRestoreIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recuperação de senha
          </Typography>
          {this.state.emailSent ?
            <Typography className={classes.desc} component="h2" variant="body1">
              Um e-mail com instruções de recuperação de senha foi enviado para {this.state.email}
            </Typography>
          :
            <Fragment>
            <Typography className={classes.desc} component="h2" variant="body1">
              Insira o endereço de e-mail cadastrado para recuperar sua senha.
            </Typography>
            <form className={classes.form} onSubmit={this.handleForgot}>
              <FormControl margin="normal" required fullWidth error={this.state.invalidEmail}>
                <InputLabel htmlFor="email">Endereço de e-mail</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>
              {this.state.invalidEmail && <FormHelperText error>{this.state.error}</FormHelperText>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Recuperar
              </Button>
            </form>
          </Fragment>
          }
        </Paper>
      </div>
    );
  }
}


export default withStyles(styles)(Forgot);
