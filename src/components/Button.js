import React, { Component } from 'react';

class Button extends Component {


  render() {
    return (
      <section className="buttonSection">
        <button onClick={this.props.clickFn}>Click this</button>
      </section>
    )
  };
}

export default Button;