import React, { Component } from 'react';

class Result extends Component {


  render() {
    return (
      <section className="resultSection">
        <h2>Your session:</h2>
        <p>You've clicked the button {this.props.click} times.</p>
        <p>You've scrolled through Safi's article {this.props.scrollThrough} times.</p>
        <p>You've spent a total of {(this.props.scrollTime / 1000).toFixed([2])} seconds reading about Safi.</p>
        <p>You've hovered over the box {this.props.totalHoverCount} times.</p>
        <p>You've spent {(this.props.totalHoverTime / 1000).toFixed([2])} seconds hovering over the box.</p>
        <h2>On Average:</h2>
        <p>This page has been visited {this.props.visit} times.</p>
        <p>The button is clicked {this.props.avgClick} times on average.</p>
        <p>The average person scroll through Safi's article {this.props.avgScrollThrough} times.</p>
        <p>The average person spends {this.props.avgScrollTime} seconds reading about Safi.</p>
        <p>{this.props.visit - this.props.exitMidPage} people actually made it through the article. {this.props.exitMidPage} did not care.</p>
        <p>On average, the box is hovered {this.props.avgHoverCount} times.</p>
        <p>People spend about {this.props.avgHoverTime} seconds hovering the box.</p>
      </section>
    )
  };
}

export default Result;