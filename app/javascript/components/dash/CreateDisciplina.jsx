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
  open: boolean,
  handleNewDisciplina: Function,
  handleCancelDisciplina: Function,
};

type State = {
  semestre: Date,
};

class CreateDisciplina extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      semestre: new Date(),
    }
  }

  handleSemestreChange = (event: any) => {
    this.setState({ semestre: event.target.value });
  }

  render () {
    const semestresItens = semestres.map((sem, idx) => 
      <MenuItem key={idx} value={sem}>{sem.getFullYear()}-{(~~(sem.getMonth()/6)) + 1}</MenuItem>
    );
    return (
      <Dialog
          open={this.props.open}
          onClose={this.props.handleCancelDisciplina}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Nova disciplina</DialogTitle>

          <form onSubmit={this.props.handleNewDisciplina} autoComplete="off">
            <DialogContent>
              <DialogContentText>
                Preencha os detalhes da nova disciplina a ser criada.
              </DialogContentText>
              
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="cod">Código</InputLabel>
                <Input name="cod" id="cod" autoFocus />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="nome">Nome</InputLabel>
                <Input id="nome" name="nome" />
              </FormControl>

              <FormControl  margin="normal" required fullWidth>
                <InputLabel htmlFor="semestre">semestre</InputLabel>
                <Select
                  value={this.state.semestre}
                  onChange={this.handleSemestreChange}
                  inputProps={{
                    name: 'semestre',
                    id: 'semestre',
                  }}
                >
                  {semestresItens}
                </Select>
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
                fullWidth
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleCancelDisciplina} color="primary">
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

export default CreateDisciplina;