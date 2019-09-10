import React, { Component } from 'react';

class Header extends Component {


  render() {
    return (
      <header>
        <h1 className="head1">Lukewarm Map</h1>
        <h1 className="head2">LukewarmAp</h1>
        <h1 className="head3">LukewarmApp</h1>
        <h1 className="head4">Lukewarm Map App</h1>
        <p><span className="emoji">👀</span></p>
        <p>Like a heatmap, but only lukewarm.</p>
      </header>
    )
  };
}

export default Header;