import React, { Component } from 'react';

class Result extends Component {


  render() {
    return (
      <div>
        <p>Button has been clicked {this.props.click} times.</p>
      </div>
    )
  };
}

export default Result;