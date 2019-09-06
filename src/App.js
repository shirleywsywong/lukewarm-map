import React, { Component } from 'react';
import firebase from './components/firebase';
import Header from './components/Header';
import Button from './components/Button';
import Result from './components/Result';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      visitCount: 1,
      clickCount: 0,
    }
  }



  componentDidMount() {

    //resetting the click counter per session
    this.setState({
      clickCount: 0,
      currentSession: '',
    })

    //connecting firebase with react
    const dbRef = firebase.database().ref();
    
    //each time the page load, add visit count as a property
    dbRef.push({visit: this.state.visitCount});

    
    dbRef.on('value', (data) => {
      
      //grab the data from FB, return an object
      data = data.val();

      //go through this object, and turn it into an array 
      const keyArray = Object.keys(data)

      //grab the last element of the array, which is the current sessionID
      const keyLast = keyArray.slice(-1)[0];

      //store this session ID in state
      this.setState({
        currentSession: keyLast,
      })

    })
  }
  
  //count button clicks
  clickCounter = () => {


    //each time the button is clicked, record it locally first
    this.setState({
      clickCount: this.state.clickCount + 1,
    })

    //storing button clicks to firebase
    const dbRef = firebase.database().ref();
    dbRef.push({click:this.state.clickCount});
    
  }

  removeData = () => {
    const dbRef = firebase.database().ref();
    dbRef.remove();
  }

  render() {
    return (
      <div>
        <Header />
        <Button fn={this.clickCounter}/>
        <Result click={this.state.clickCount}/>
        <button onClick={this.removeData}>FUBAR</button>
      </div>
    )
  };
}

export default App;
