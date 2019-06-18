// @flow    
import React, { Component } from "react"
import { Redirect, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'

import axios from 'axios';

const styles = theme => ({
  root: {
  },
  table: {
    margin: '0 auto',
  },
  card: {
    textAlign: 'center',
  },
});

type Props = {
    semestre: Date,
    classes: Object,
};

type State = {
    notas: Array<any>,
    didFetch: boolean,
}

const format_date = (date: Date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    } 
    if (mm < 10) {
        mm = '0' + mm;
    } 
    return dd + '/' + mm + '/' + yyyy;
}

class QuickView extends Component<Props, State> {

    constructor() {
        super();
        this.state = {
            notas: [],
            didFetch: false,
        }
    }

    fetchNotas = () => {
        axios.get('/notas/quick', {
            params: {
                semestre: this.props.semestre,
            }
        }).then(res => {
            this.setState({
                notas: res.data,
                didFetch: true,
            })
        }).catch(err => {
            console.log(err);
            // TODO: handle errors
        })
    }

    componentDidMount = () => {
        this.fetchNotas();
    }

    render() {
        if (!this.state.didFetch)
            return <CircularProgress />
        return (
            <Grid item lg={12} container >
                <Typography gutterBottom variant="h4" component="h2">
                    Últimas notas
                </Typography>
                <Table className={this.props.classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Atividade</TableCell>
                            <TableCell>Disciplina</TableCell>
                            <TableCell>Última modificação</TableCell>
                            <TableCell>Nota 0-100</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.notas
                            .sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at))
                            .map((nota, idx) => (
                                <TableRow key={idx}>
                                    <TableCell component="th" scope="row">
                                        {nota.atividade.nome}
                                    </TableCell>
                                    <TableCell> 
                                        {nota.atividade.disciplina.cod} {nota.atividade.disciplina.nome}
                                    </TableCell>
                                    <TableCell>{format_date(new Date(nota.updated_at))}</TableCell>
                                    <TableCell>{nota.nota}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Grid>
        )
    }
}

export default withStyles(styles)(QuickView);