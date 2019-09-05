import React, { Component } from 'react';

class Button extends Component {


  render() {
    return (
      <div>
        <button onClick={this.props.fn}>Click this</button>
      </div>
    )
  };
}

export default Button;