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
      visitCount: 1, //every session is a visit count
      clickCount: 0, //click count per session
      totalVisit: 0, //data from FB (dataAnalysis fn)
      totalClick: 0, //data from FB (dataAnalysis fn)
      avgClick: 0, //data from FB (dataAnalysis fn)
      lastSectionState: false, //check scroll location
      entryTime: 0, //time user enter scroll section
      exitTime: 0, //time user exit scroll section
      timeSpanArray: [], //record each time difference user enter and exit scroll section
      totalScrollTime: 0, //sum of values in timeSpanArray
      totalScrollThrough: 0, //length of values in timeSpanArray
      avgScrollThrough: 0, //data from FB (dataAnalysis fn)
      avgScrollTime: 0, //data from FB (dataAnalysis fn)
    }
  }

  //things that needs to happen on page load goes here
  componentDidMount() {

    this.showVisible();
    window.addEventListener("scroll", this.showVisible, false);

    // connecting firebase with react
    const dbRef = firebase.database().ref();
    
    dbRef.on('value', (data) => {
      
      //grab the data from FB, return an object
      data = data.val();
      
      //go through this object, and turn it into an array 
      const fbValuesArray = Object.values(data);
      
      //pass this data to data analysis function
      this.dataAnalysis(fbValuesArray)

    })

    // upload data collected to firebase before user refreshes or close the page
    window.addEventListener('beforeunload', (e) => {

      const session = {
        visit: this.state.visitCount,
        clickCount: this.state.clickCount,
        timeElapsed:this.state.totalScrollTime,
        scrollCount:this.state.totalScrollThrough,
        didNotFinishReading:this.state.lastSectionState,
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
    let scrollCountArray = [];
    let scrollTimeArray = [];
    sessionArray.forEach( (item) => {
      clickArray.push(item.clickCount);
      visitArray.push(item.visit);
      scrollCountArray.push(item.scrollCount);
      scrollTimeArray.push(item.timeElapsed);
    })

    //total up the data
    //visitor total
    const fbVisitTotal = visitArray.reduce((total, num) => {
      return total + num;
    })
    //click total
    const fbClickTotal = clickArray.reduce((total, num) => {
      return total + num;
    })
    //scroll count total
    const fbScrollCountTotal = scrollCountArray.reduce((total, num) => {
      return total + num;
    })
    //scrolling time elapsed total
    const fbScrollElapsedTotal = scrollTimeArray.reduce((total, num) => {
      return total + num;
    })
    const fbScrollElapsedFormatted = Math.floor((fbScrollElapsedTotal / 1000));


    //average calculations
    const fbAverageClick = (fbClickTotal / fbVisitTotal).toFixed([2]);
    const fbAverageScrollThrough = (fbScrollCountTotal / fbVisitTotal).toFixed([2]);
    const fbAverageScrollElapsed = (fbScrollElapsedFormatted / fbVisitTotal).toFixed([2]);

    // store the totals in state, to be rendered in results section
    this.setState({
      totalVisit: fbVisitTotal,
      totalClick: fbClickTotal,
      avgClick: fbAverageClick,
      avgScrollThrough: fbAverageScrollThrough,
      avgScrollTime: fbAverageScrollElapsed,
    })
  }

  //count button clicks
  clickCounter = () => {

    //each time the button is clicked, record it locally first
    this.setState({
      clickCount: this.state.clickCount + 1,
    })
  }

  //see if scroll section is in the viewport
  isVisible = (elem) => {

    //find the element's relative position to viewport
    let coords = elem.getBoundingClientRect();

    let windowHeight = document.documentElement.clientHeight;

    // top elem edge is visible?
    let topVisible = coords.top > 0 && coords.top < windowHeight;

    // bottom elem edge is visible?
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    let middleVisible = coords.top < 0 && coords.bottom > windowHeight;

    //do something only if scroll section is visible 
    return (topVisible || bottomVisible) || middleVisible;
  }

  //if scroll section is visible, do this
  showVisible = () => {
    let section = document.getElementById('scrollSection');
    let currentSectionState = this.isVisible(section);
    let elapsedTimeArray = this.state.timeSpanArray; 
    
    // you weren't in the section and now you are
    if(!this.state.lastSectionState && currentSectionState) {

      //record the entry time
      let entryTime = Date.now();
      this.setState({
        lastSectionState: true,
        entryTime: entryTime,
      })
    } else // you were in the section, and now you aren't
    if(this.state.lastSectionState && !currentSectionState) { 

      // record the exit time
      let exitTime = Date.now();
      this.setState({
        lastSectionState: false,
        exitTime: exitTime,
      })

      //calculate time span for each entry and exit
      let elapsedTime = this.state.exitTime - this.state.entryTime;
      elapsedTimeArray.push(elapsedTime);
      
      this.setState({
        timeSpanArray: elapsedTimeArray,
      })

      this.timeSpanCounter();
    }
  }

  //Scroll section: calculate total time span
  timeSpanCounter = () => {
    const timeSpanTotal = this.state.timeSpanArray.reduce((total, num) => {
      return total + num;
    })
    const scrollCount = this.state.timeSpanArray.length
    this.setState({
      totalScrollTime: timeSpanTotal,
      totalScrollThrough: scrollCount,
    })
  }

  // Activate only in emergency situation, like putting the database in an infinite loop
  // removeData = () => {
  //   const dbRef = firebase.database().ref();
  //   dbRef.remove();
  // }

  render() {
    return (
      <div>
        <Header />
        <Button clickFn={this.clickCounter}/>
        <Scroll/>
        <Result 
          click={this.state.clickCount} 
          scrollThrough={this.state.totalScrollThrough}
          scrollTime={this.state.totalScrollTime}
          visit={this.state.totalVisit} 
          avgClick={this.state.avgClick}
          avgScrollThrough={this.state.avgScrollThrough}
          avgScrollTime={this.state.avgScrollTime}
        />
        {/* ONLY ACTIVATE IF YOU REALLY FUCKED UP <button onClick={this.removeData}>Shit happened</button> */}
      </div>
    )
  };
}

export default App;
