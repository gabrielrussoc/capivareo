// @flow
import React, { Component } from "react"
import type { ColorType } from "../types"

type Props = {
  text: string,
  color: ColorType,
};

class Button extends Component<Props> {
  render () {
    return (
      <button className={`waves-effect waves-light btn ${this.props.color}`}>{this.props.text}</button>
    );
  }
}

export default Button
