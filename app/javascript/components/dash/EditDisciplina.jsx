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
import type { DisciplinaType } from '../../types';

type Props = {
  open: boolean,
  handleClose: Function,
  dis: DisciplinaType,
};

type State = {
  semestre: string,
};

class EditDisciplina extends Component<Props, State> {

  constructor(props: Props) {
    super();
    this.state = {
      semestre: props.dis.semestre.toISOString(),
    }
  }

  handleEditDisciplina = (event: any) => {
    event.preventDefault();

    const target = event.target;

    const id = this.props.dis.id;
    const nome = target.nome.value;
    const cod = target.cod.value;
    const descr = target.descr.value;
    const semestre = target.semestre.value;

    axios.put('/disciplinas', {
      id: id,
      disciplina: {
        id: id,
        nome: nome,
        cod: cod,
        descr: descr,
        semestre: semestre,
      }
    }).then((res) => {
      this.props.handleClose(true);
    }).catch((err) => {
      console.log(err.data);
      // TODO: handle errors
    });
  }
  
  handleSemestreChange = (event: any) => {
    this.setState({ semestre: event.target.value });
  }

  render () {
    const semestresItens = semestres.map((sem, idx) => 
      <MenuItem key={idx} value={sem.toISOString()}>{sem.getFullYear()}-{(~~(sem.getMonth()/6)) + 1}</MenuItem>
    );
    return (
      <Dialog
          open={this.props.open}
          onClose={() => this.props.handleClose(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Editar disciplina</DialogTitle>

          <form onSubmit={this.handleEditDisciplina} autoComplete="off">
            <DialogContent>
              <DialogContentText>
                Edite os campos desejados.
              </DialogContentText>
              
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="cod">Código</InputLabel>
                <Input name="cod" id="cod" defaultValue={this.props.dis.cod} autoFocus />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="nome">Nome</InputLabel>
                <Input id="nome" name="nome" defaultValue={this.props.dis.nome} />
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
                defaultValue={this.props.dis.descr}
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

export default EditDisciplina;