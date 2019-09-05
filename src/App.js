import React, { Component } from 'react';
import firebase from './components/firebase';
import Header from './components/Header';
import Button from './components/Button';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      clickCount: 0,
    }
  }

  componentDidMount() {

    //connecting firebase with react
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      console.log(response.val())
    })
  }
  
  //count button clicks
  clickCounter = () => {
    this.setState({
      clickCount: this.state.clickCount + 1,
    })
    console.log('clicked');
  }


  render() {
    return (
      <div>
        <Header />
        <Button fn={this.clickCounter}/>
      </div>
    )
  };
}

export default App;
