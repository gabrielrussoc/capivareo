// @flow
import React, { Component } from "react"
import type { ColorType } from '../types'

type Props = {
  color: ColorType;
};

class Footer extends Component<Props> {
  render () {
    return (
      <footer className={`page-footer ${this.props.color}`}>
          <div className="footer-copyright">
            <div className="container center">
              ❤ 2019
            </div>
          </div>
        </footer>
    );
  }
}

export default Footer
