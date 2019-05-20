// @flow

import React from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  onChange: Function,
  classes: Object,
}

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const SearchBar = (props: Props) => {
  const classes = props.classes;
  return (
     <TextField
          id="outlined-search"
          label="Buscar disciplinas"
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          autoFocus
          autoComplete='off'
          onChange={props.onChange}
          fullWidth
      />
  );
};

export default withStyles(styles)(SearchBar);