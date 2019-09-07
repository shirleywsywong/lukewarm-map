import React, { Component } from 'react';
import firebase from './components/firebase';
import Header from './components/Header';
import Button from './components/Button';
import Scroll from './components/Scroll';
import Result from './components/Result';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      visitCount: 1,
      clickCount: 0,
      totalVisit: 0,
      totalClick: 0,
      avgClick: 0,
    }
  }

  componentDidMount() {
    //resetting the click counter per session
    this.setState({
      clickCount: 0,
    })

    //connecting firebase with react
    const dbRef = firebase.database().ref();
    
    dbRef.on('value', (data) => {
      
      //grab the data from FB, return an object
      data = data.val();
      
      //go through this object, and turn it into an array 
      const fbValuesArray = Object.values(data);
      
      //pass this data to data analysis function
      this.dataAnalysis(fbValuesArray)

    })

    //upload data collected to firebase before user refreshes or close the page
    window.addEventListener('beforeunload', (e) => {
      // e.preventDefault();
      const session = {
        visit: this.state.visitCount,
        clickCount: this.state.clickCount
      }
      dbRef.push({session});

      //beforeunload needs to return something, so delete the return to work in chrome
      delete e['returnValue'];
    })
  }
  
  //analyze data from FB
  dataAnalysis = (fbValuesArray) => {

    //only want data in the session object
    let sessionArray = [];
    fbValuesArray.forEach( (item) => {
      sessionArray.push(item.session);
    })

    //extracting data from sessions
    let clickArray = [];
    let visitArray = [];
    sessionArray.forEach( (item) => {
      clickArray.push(item.clickCount)
      visitArray.push(item.visit)
    })

    //total up the data
    const fbClicktotal = clickArray.reduce((total, num) => {
      return total + num;
    })
    const fbVisittotal = visitArray.reduce((total, num) => {
      return total + num;
    })

    //average calculations
    const averageClick = (fbClicktotal / fbVisittotal).toFixed([2]);

    // store the totals in state
    this.setState({
      totalVisit: fbVisittotal,
      totalClick: fbClicktotal,
      avgClick: averageClick,
    })
  }


  //count button clicks
  clickCounter = () => {

    //each time the button is clicked, record it locally first
    this.setState({
      clickCount: this.state.clickCount + 1,
    })
  }

  scrollCounter = () => {
    console.log(`I'm scrolled`)
  }

  // removeData = () => {
  //   const dbRef = firebase.database().ref();
  //   dbRef.remove();
  // }

  render() {
    return (
      <div>
        <Header />
        <Button clickFn={this.clickCounter}/>
        <Scroll scrollFn={this.scrollCounter} />
        <Result click={this.state.clickCount} visit={this.state.totalVisit} avgClick={this.state.avgClick}/>
        {/* <button onClick={this.removeData}>Shit happened</button> */}
      </div>
    )
  };
}

export default App;
