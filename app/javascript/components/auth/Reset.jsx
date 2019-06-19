// @flow
import React, { Component, Fragment } from "react"
import axios from 'axios'
import queryString from 'query-string'
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
  classes: Object,
  location: Object,
};

type State = {
  toHome: boolean,
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
  desc: {
    marginTop: theme.spacing.unit,
  },
});

class Reset extends Component<Props, State> {

  constructor () {
    super();
    this.state = {
      toHome: false,
      errors: {},
    }
  }

  handleReset = (e: any) => {
    const params = queryString.parse(this.props.location.search);
    e.preventDefault();
    this.setState({
      errors: {},
    })
    const password = e.target.password.value;
    const password_confirmation = e.target.password_confirmation.value;
    axios.put('/users/password.json', {
      user: {
        reset_password_token: params.reset_password_token,
        password: password,
        password_confirmation: password_confirmation
      }
    }).then(res => {
      this.setState({
        toHome: true,
      })
    }).catch(err => {
      this.setState({
        errors: err.response.data.errors,
      })
    });
  }

  render () {
    const { classes } = this.props;
    const errors = Object.entries(this.state.errors).map((err, idx) => 
      <FormHelperText key={idx} error>{`${err[0]}: ${String(err[1])}`}</FormHelperText>
    )
    if (this.state.toHome) {
      return <Redirect to="/" />
    }
    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SettingsBackupRestoreIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Redefina sua senha
          </Typography>
          {errors}
          <form className={classes.form} onSubmit={this.handleReset}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Senha</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="off" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password_confirmation">Confirme a senha</InputLabel>
              <Input name="password_confirmation" type="password" id="password_confirmation" autoComplete="off" />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Redefinir
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}


export default withStyles(styles)(Reset);
