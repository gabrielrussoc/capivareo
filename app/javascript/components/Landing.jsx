// @flow
import React, { Component } from "react"

import smart from '../../assets/images/smart.png'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  classes: Object
};

const styles = theme => ({
  capi: {
    margin: '0 auto',
    display: 'block',
    width: '40%',
    height: 'auto',
  },
});

class Landing extends Component<Props> {
  render () {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} align="center">
        <Grid item lg={12}>
          <Grid item lg={12}>
            <Typography variant='h2'>
              Capivareo
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <Typography variant='h5'>
              Sistema de divulgação de notas da USP
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <img src={smart} className={classes.capi} />
          </Grid>
          <Grid item lg={12}>
            <Typography variant='body1'>
              Capivareo é um projeto da matéria MAC0218 Técnicas de Programação II
              do IME-USP, ministrada pelo professor Marco Dimas Gubitoso no 
              primeiro semestre de 2019.<br/>
              <Link target="_blank" href='https://github.com/gabrielrussoc/capivareo'>Código-fonte</Link>.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Landing);
