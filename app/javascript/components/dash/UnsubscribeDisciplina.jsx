// @flow
import React, { Component } from "react"
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';

import type { DisciplinaType } from '../../types';

type Props = {
  dis: DisciplinaType,
  open: boolean,
  handleClose: Function,
};

type State = {
  didRemove: boolean,
}

class UnsubscribeDisciplina extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      didRemove: false,
    }
  }

  handleRemoveDisciplina = (event: any) => {
    axios.delete('/enroll', {
      params: {
        disciplina_id: this.props.dis.id,
      }
    }).then((res) => {
      this.setState({
        didRemove: true,
      })
    }).catch((err) => {
      console.log(err.data);
      // TODO: handle errors
    });
  }
  
  render () {
    if (this.state.didRemove)
      return <Redirect to="/" />
    return (
      <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Remover disciplina</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você realmente deseja remover a disciplina {this.props.dis.cod} {this.props.dis.nome}?
            Suas notas NÃO serão perdidas.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary" autoFocus>
            Cancelar
          </Button>
          <Button onClick={this.handleRemoveDisciplina} color="primary">
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default UnsubscribeDisciplina;