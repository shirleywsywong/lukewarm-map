import React, { Component } from 'react';

class Result extends Component {


  render() {
    return (
      <section className="resultSection">
        <h2>Your session:</h2>
        <p>You've clicked the button {this.props.click} times.</p>
        <p>You've scrolled through Safi's article {this.props.scrollThrough} times.</p>
        <p>You've spent a total of {this.props.scrollTime} seconds reading about Safi.</p>
        <h2>On Average:</h2>
        <p>This page has been visited {this.props.visit} times.</p>
        <p>The button is clicked {this.props.avgClick} times on average.</p>
        <p>The average person scroll through Safi's article {this.props.avgScrollThrough} times.</p>
        <p>The average person spends {this.props.avgScrollTime} seconds reading about Safi.</p>
        <p>{} people actually made it through the article. {} did not care.</p>
      </section>
    )
  };
}

export default Result;