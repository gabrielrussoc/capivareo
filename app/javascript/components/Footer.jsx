// @flow
import React, { Component } from "react"
import type { ColorType } from '../types'
import Typography from '@material-ui/core/Typography'

type Props = {
};

class Footer extends Component<Props> {
  render () {
    return (
      <footer>
        <Typography variant="h6" align="center" gutterBottom>
          ❤ 2019
        </Typography>
      </footer>
    );
  }
}

export default Footer;