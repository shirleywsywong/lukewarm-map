import React, { Component } from 'react';

class Hover extends Component {

  render() {
    return (
      <section className="hoverSection">
        <div onMouseEnter={this.props.mouseEnterFn} onMouseLeave={this.props.mouseLeaveFn} className="box">
          <p>Hover Me!</p>
        </div>
      </section>
    )
  };
}

export default Hover;