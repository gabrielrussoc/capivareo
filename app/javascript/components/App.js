// @flow
import React, { Component } from "react"

type Props = {
  greeting: string;
};

class App extends Component<Props> {
  render () {
    return (
      <React.Fragment>
        Greeting: {this.props.greeting}
      </React.Fragment>
    );
  }
}
export default App
