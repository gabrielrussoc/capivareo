// @flow
import React, { Component } from "react"

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';

import type { AtividadeType } from '../../types';

type Props = {
  open: boolean,
  handleClose: Function,
  at: AtividadeType,
};

class EditAtividade extends Component<Props> {

  handleEditAtividade = (event: any) => {
    event.preventDefault();

    const target = event.target;

    const id = this.props.at.id;
    const nome = target.nome.value;
    const desc = target.descr.value;

    axios.put('/atividades', {
      atividade: {
        id: id,
        nome: nome,
        desc: desc,
      }
    }).then((res) => {
      this.props.handleClose(true);
    }).catch((err) => {
      console.log(err.data);
      // TODO: handle errors
    });
  }
  
  render () {
    return (
      <Dialog
          open={this.props.open}
          onClose={() => this.props.handleClose(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Editar atividade</DialogTitle>

          <form onSubmit={this.handleEditAtividade} autoComplete="off">
            <DialogContent>
              <DialogContentText>
                Edite os campos desejados.
              </DialogContentText>
              
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="nome">Nome</InputLabel>
                <Input id="nome" name="nome" defaultValue={this.props.at.nome} />
              </FormControl>

              <TextField
                id="standard-multiline-static"
                label="Descrição"
                multiline
                rows="6"
                margin="normal"
                inputProps={{
                  'name': 'descr'
                }}
                defaultValue={this.props.at.desc}
                fullWidth
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.props.handleClose(false)} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Editar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
    );
  }
}

export default EditAtividade;