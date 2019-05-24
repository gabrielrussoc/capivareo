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

import type { DisciplinaType, AtividadeType } from '../../types';

type Props = {
  dis: DisciplinaType,
  at: AtividadeType,
  open: boolean,
  handleClose: Function,
};

type State = {
  didRemove: boolean,
}

class RemoveAtividade extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      didRemove: false,
    }
  }

  handleRemoveAtividade = (event: any) => {
    axios.delete('/atividades', {
      params: {
        id: this.props.at.id,
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
      return <Redirect to={`/disciplinas/${this.props.dis.id}`} />
    return (
      <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Remover atividade</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você realmente deseja remover a atividade {this.props.at.nome} da
            disciplina {this.props.dis.cod} {this.props.dis.nome}?
            Esta ação é irreversível.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary" autoFocus>
            Cancelar
          </Button>
          <Button onClick={this.handleRemoveAtividade} color="primary">
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default RemoveAtividade;