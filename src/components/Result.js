import React, { Component } from 'react';

class Result extends Component {


  render() {
    return (
      <section className="resultSection">
        <p>You've clicked the button {this.props.click} times.</p>
        <p>This page has been visited {this.props.visit} times.</p>
        <p>Average button click is {this.props.avgClick} times.</p>
      </section>
    )
  };
}

export default Result;