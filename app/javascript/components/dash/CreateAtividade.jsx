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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';

import semestres from '../../semestres';

type Props = {
  dis_id: number,
  open: boolean,
  handleClose: Function,
};

type State = {
};

class CreateAtividade extends Component<Props, State> {

  constructor(props: Props) {
    super();
    this.state = {
    }
  }

  handleCreateAtividade = (event: any) => {
    event.preventDefault();

    const target = event.target;

    const nome = target.nome.value;
    const desc = target.desc.value;

    axios.post('/atividades', {
      atividade: {
        nome: nome,
        desc: desc,
        disciplina_id: this.props.dis_id,
      }
    }).then((res) => {
      this.props.handleClose(true);
    }).catch((err) => {
      console.log(err);
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
          <DialogTitle id="form-dialog-title">Nova atividade</DialogTitle>

          <form onSubmit={this.handleCreateAtividade} autoComplete="off">
            <DialogContent>

              <DialogContentText>
                Preencha os detalhes da nova atividade a ser criada.
              </DialogContentText>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="nome">Nome</InputLabel>
                <Input id="nome" name="nome" />
              </FormControl>

              <TextField
                id="standard-multiline-static"
                label="Descrição"
                multiline
                rows="6"
                margin="normal"
                inputProps={{
                  'name': 'desc'
                }}
                fullWidth
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.props.handleClose(false)} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Criar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
    );
  }
}

export default CreateAtividade;