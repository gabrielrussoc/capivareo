// @flow
import React, { Component, Fragment } from "react"

import SearchBar from './SearchBar';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

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
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';

import semestres from '../../semestres';
import type { DisciplinaProfType } from '../../types';

import axios from 'axios';
import Fuse from 'fuse.js';

type Props = {|
  open: boolean,
  handleDoneAddDisciplina: Function,
  classes: Object,
  disciplinas: Array<DisciplinaProfType>,
  didFetch: boolean,
  handleEnroll: Function,
|};

type State = {
  readyToSearch: boolean,
  fuse: Fuse,
  result: Array<DisciplinaProfType>,
}

const styles = theme => ({
  table: {
    width: '100%',
  },
});

class SearchDisciplina extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      readyToSearch: false,
      disciplinas: [],
      fuse: null,
      result: [],
    }
  }

  handleEnroll = (disciplinaId: number) => {
    axios.post('/enroll', {
      disciplina_id: disciplinaId,
    }).then((res) => {
      this.props.handleEnroll(disciplinaId);
    }).catch((err) => {
      console.log(err);
      // TODO: handle error
    })
  }

  handleSearch = (event: any) => {
    const query = event.target.value;
    if (query === '') {
      this.setState((state:State, props: Props) => ({
        result: props.disciplinas,
      }));
      return;
    }
    const result = this.state.fuse.search(query);
    this.setState({
      result: result,
    });
  }

  buildFuzzySearch = () => {
    const options = {
      caseSensitive: true,
      shouldSort: true,
      findAllMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        "nome",
        "cod",
        "user.nome",
      ]
    };
    this.setState((state: State, props: Props) => ({
      fuse: new Fuse(props.disciplinas, options),
      readyToSearch: true,
      result: props.disciplinas,
    }))
  }

  componentDidMount = () => {
    if (this.props.didFetch)
      this.buildFuzzySearch();
  }

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.didFetch !== this.props.didFetch) {
      this.setState({
        readyToSearch: false,
      })
      if (this.props.didFetch)
        this.buildFuzzySearch();
    }
  }

  render () {
    const classes = this.props.classes;
    return (
      <Dialog
          open={this.props.open}
          onClose={this.props.handleDoneAddDisciplina}
          aria-labelledby="form-dialog-title"
          maxWidth='md'
          fullWidth
        >
          <DialogTitle id="form-dialog-title">
            Adicionar disciplina
          </DialogTitle>

          <DialogContent>
          {!this.state.readyToSearch
          ? <CircularProgress />
          : <Fragment>
              <SearchBar onChange={this.handleSearch} />

              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Disciplina</TableCell>
                    <TableCell>Professor</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.result
                    .map((d: DisciplinaProfType, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{d.cod}</TableCell>
                      <TableCell component="th" scope="row">
                        {d.nome}
                      </TableCell>
                      <TableCell>{d.user.nome}</TableCell>
                      <TableCell>
                        {!d.enrolled
                        ? <IconButton aria-label="Enroll" onClick={() => this.handleEnroll(d.id)} >
                          <AddIcon />
                        </IconButton>
                        : <IconButton disabled>
                          <CheckIcon />
                        </IconButton>
                        }
                        
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Fragment>
          }
          </DialogContent>

          <DialogActions>
            <Button onClick={this.props.handleDoneAddDisciplina} color="primary">
              Pronto
            </Button>
          </DialogActions>

        </Dialog>
    );
  }
}

export default withStyles(styles)(SearchDisciplina);