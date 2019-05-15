// @flow
import React, { Fragment } from "react"
import {Link} from "react-router-dom"
import Button from '@material-ui/core/Button'

type Props = {
};

const LoginButtons = (props: Props) => { 
    return (
      <Fragment>
        <Button component={Link} to="/login">Entrar</Button>
        <Button component={Link} to="/signup">Registrar</Button>
      </Fragment>
    );
}

export default LoginButtons
