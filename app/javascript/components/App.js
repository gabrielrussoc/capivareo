// @flow
import React, { Component } from "react"

type Props = {
  greeting: string;
};

class App extends Component<Props> {
  render () {
    return (
      <div className='card'>
        React: {this.props.greeting}
      </div>
    );
  }
}
export default App
