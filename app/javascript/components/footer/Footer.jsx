// @flow
import React, { Component } from "react"
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