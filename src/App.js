import React, { Component } from 'react';
import firebase from './components/firebase';
import Header from './components/Header';
import Button from './components/Button';
import Scroll from './components/Scroll';
import Hover from './components/Hover';
import Form from './components/Form';
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
      scrollEntryTime: 0, //time user enter scroll section
      scrollExitTime: 0, //time user exit scroll section
      scrollElapsedArray: [], //record each time difference user enter and exit scroll section
      totalScrollTime: 0, //sum of values in scrollElapsedArray
      totalScrollThrough: 0, //length of values in scrollElapsedArray
      avgScrollThrough: 0, //data from FB (dataAnalysis fn)
      avgScrollTime: 0, //data from FB (dataAnalysis fn)
      exitMidPage: 0, //data from FB (dataAnalysis fn)
      hoverEntryTime: 0, //time user mouse enter box
      hoverExitTime: 0, //time user mouse leave box
      hoverElapsedArray: [], //record each time difference user enter and exit hover box
      totalHoverTime: 0, //sum of values in hoverElapsedArray
      totalHoverCount: 0, //length of values in scrollElapsedArray
      avgHoverCount: 0, //data from FB (dataAnalysis fn)
      avgHoverTime: 0, //data from FB (dataAnalysis fn)
      keyCountName: 0, //record keystroke on form Name field
      keyCountPhone: 0, //record keystroke on form Phone field
      keyCountEmail: 0, //record keystroke on form Email field
      formEntryName: '', //record values entered from Name field
      formEntryPhone: '', //record values entered from Phone field
      formEntryEmail: '', //record values entered from Email field
      formNameCount: 0, //data from FB (dataAnalysis fn)
      formPhoneCount: 0, //data from FB (dataAnalysis fn)
      formEmailCount: 0, //data from FB (dataAnalysis fn)
    }
  }

  //things that needs to happen on page load goes here
  componentDidMount() {

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
        scrollTimeElapsed: this.state.totalScrollTime,
        scrollCount: this.state.totalScrollThrough,
        didExitInScroll: this.state.lastSectionState,
        hoverTimeElapsed: this.state.totalHoverTime,
        hoverCount: this.state.totalHoverCount,
        keyCountName: this.state.keyCountName,
        keyCountPhone: this.state.keyCountPhone,
        keyCountEmail: this.state.keyCountEmail,
        formEntryName: this.state.formEntryName,
        formEntryPhone: this.state.formEntryPhone,
        formEntryEmail: this.state.formEntryEmail,
      }
      dbRef.push({session});

      //beforeunload needs to return something, so delete the return to work in chrome
      delete e['returnValue'];
    })
  }
  
  //-------------analyze data from FB ------------------
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
    let readingArray = [];
    let hoverCountArray = [];
    let hoverTimeArray = [];
    let keyCountNameArray = [];
    let keyCountPhoneArray = [];
    let keyCountEmailArray = [];
    let formEntryNameArray = [];
    let formEntryPhoneArray = [];
    let formEntryEmailArray = [];
    sessionArray.forEach( (item) => {
      clickArray.push(item.clickCount);
      visitArray.push(item.visit);
      scrollCountArray.push(item.scrollCount);
      scrollTimeArray.push(item.scrollTimeElapsed);
      readingArray.push(item.didExitInScroll);
      hoverCountArray.push(item.hoverCount);
      hoverTimeArray.push(item.hoverTimeElapsed);
      keyCountNameArray.push(item.keyCountName);
      keyCountPhoneArray.push(item.keyCountPhone);
      keyCountEmailArray.push(item.keyCountEmail);
      formEntryNameArray.push(item.formEntryName);
      formEntryPhoneArray.push(item.formEntryPhone);
      formEntryEmailArray.push(item.formEntryEmail);
    })

    //total up the data
    function addFn(array) {
      const value = array.reduce((total, num) => {
        return total + num;
      })
      return value;
    }
    //visitor total
    const fbVisitTotal = addFn(visitArray);
    //click total
    const fbClickTotal = addFn(clickArray);
    //scroll count total
    const fbScrollCountTotal = addFn(scrollCountArray);
    //scrolling time elapsed total
    const fbScrollElapsedTotal = addFn(scrollTimeArray);
    const fbScrollElapsedFormatted = Math.floor((fbScrollElapsedTotal / 1000));
    //hover count total
    const fbHoverCountTotal = addFn(hoverCountArray);
    //hovering time elapsed total
    const fbHoverElapsedTotal = addFn(hoverTimeArray);
    const fbHoverElapsedFormatted = Math.floor((fbHoverElapsedTotal / 1000));

    //average calculations
    function avgFn(num) {
      return (num / fbVisitTotal).toFixed([2]);
    }
    const fbAverageClick = avgFn(fbClickTotal);
    const fbAverageScrollThrough = avgFn(fbScrollCountTotal);
    const fbAverageScrollElapsed = avgFn(fbScrollElapsedFormatted);
    const fbAverageHoverCount = avgFn(fbHoverCountTotal);
    const fbAverageHoverElapsed = avgFn(fbHoverElapsedFormatted);

    //determine if user finish reading
    for (let i = 0; i < scrollCountArray.length; i++) {
      if (readingArray[i] && scrollCountArray[i] === 0) {
        this.setState({
          exitMidPage: this.state.exitMidPage + 1,
        })
      }
    }

    //determin if user started filling out form
    function formCounting (array) {
      let count = 0;

      //grab the values in each form field's array
      const entryLength = array.values();

      //only want to count the people who started typing in the fields
      for (let eachEntryLength of entryLength) {
        if (eachEntryLength !== 0) {
          count = count +1;
        }
      }
      return count;
    }
    let nameCount = formCounting(keyCountNameArray);
    let phoneCount = formCounting(keyCountPhoneArray);
    let emailCount = formCounting(keyCountEmailArray);

    // store the results in state, to be rendered in results section
    this.setState({
      totalVisit: fbVisitTotal,
      totalClick: fbClickTotal,
      avgClick: fbAverageClick,
      avgScrollThrough: fbAverageScrollThrough,
      avgScrollTime: fbAverageScrollElapsed,
      avgHoverCount: fbAverageHoverCount,
      avgHoverTime: fbAverageHoverElapsed,
      formNameCount: nameCount,
      formPhoneCount: phoneCount,
      formEmailCount: emailCount,
    })
  }
  //-------------Click section functions here ------------------
  //count button clicks
  appClickCount = (clickCount) => {

    //each time the button is clicked, record it locally first
    this.setState({
      clickCount
    })
  }
  
  //-------------Scroll section functions here ------------------
  //\\//\\//\\//\\//\\//\\//\\//\\
  // isVisible = (elem) => {

  //   //find the element's relative position to viewport
  //   let coords = elem.getBoundingClientRect();

  //   let windowHeight = document.documentElement.clientHeight;

  //   // top elem edge is visible?
  //   let topVisible = coords.top > 0 && coords.top < windowHeight;

  //   // bottom elem edge is visible?
  //   let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  //   let middleVisible = coords.top < 0 && coords.bottom > windowHeight;

  //   //do something only if scroll section is visible 
  //   return (topVisible || bottomVisible) || middleVisible;
  // }

  // //if scroll section is visible, do this
  // showVisible = () => {
  //   let section = document.getElementById('scrollSection');
  //   let currentSectionState = this.isVisible(section);
  //   let elapsedTimeArray = this.state.scrollElapsedArray; 
    
  //   // you weren't in the section and now you are
  //   if(!this.state.lastSectionState && currentSectionState) {

  //     //record the entry time
  //     let scrollEntryTime = Date.now();
  //     this.setState({
  //       lastSectionState: true,
  //       scrollEntryTime: scrollEntryTime,
  //     })
  //   } else // you were in the section, and now you aren't
  //   if(this.state.lastSectionState && !currentSectionState) { 

  //     // record the exit time
  //     let scrollExitTime = Date.now();
  //     this.setState({
  //       lastSectionState: false,
  //       scrollExitTime: scrollExitTime,
  //     })

  //     //calculate time span for each entry and exit
  //     let elapsedTime = this.state.scrollExitTime - this.state.scrollEntryTime;
  //     elapsedTimeArray.push(elapsedTime);
      
  //*     this.setState({
  //*       scrollElapsedArray: elapsedTimeArray,
  //*     })

  //*     const scrollSpanTotal = this.timeSpanCounter(this.state.scrollElapsedArray);
  //*     const scrollCount = this.state.scrollElapsedArray.length;
  //*     this.setState({
  //*       totalScrollTime: scrollSpanTotal,
  //*       totalScrollThrough: scrollCount,
  //*     })
  //   }
  // }
  //\\//\\//\\//\\//\\//\\//\\//\\
  appScroll = (scrollElapsedArray) => {
    this.setState({
      scrollElapsedArray
    })

    const scrollSpanTotal = this.timeSpanCounter(this.state.scrollElapsedArray);
    const scrollCount = this.state.scrollElapsedArray.length;
    this.setState({
      totalScrollTime: scrollSpanTotal,
      totalScrollThrough: scrollCount,
    })
  }

  //calculate total time span
  timeSpanCounter = (timeArray) => {
    if(timeArray.length === 0) return 0;
    
    const timeSpanTotal = timeArray.reduce((total, num) => {
      return total + num;
    })
    return timeSpanTotal
  }
  //-------------Hover section functions here ------------------
  //on mouse enter, grab current time
  mouseEnter = () => {
    const hoverEntryTime = Date.now();
    this.setState({
      hoverEntryTime: hoverEntryTime,
    })
  }

  //on mouse leave, grab current time
  mouseLeave = () => {
    const hoverExitTime = Date.now();
    
    //calculate the difference b/t entry and exit, and record the difference in an array
    let hoverElapsedTime = hoverExitTime - this.state.hoverEntryTime;
    let hoverElapsedArray = this.state.hoverElapsedArray;
    hoverElapsedArray.push(hoverElapsedTime)

    //re-use timeSpanCounter calculator function
    const hoverSpanTotal = this.timeSpanCounter(hoverElapsedArray);
    const hoverCount = hoverElapsedArray.length;

    this.setState({
      hoverExitTime: hoverExitTime,
      hoverElapsedArray: hoverElapsedArray,
      totalHoverTime: hoverSpanTotal,
      totalHoverCount: hoverCount,
    })
  }
  //-------------Form section functions here ------------------
  //count keystrokes on each of the form fields
  formTyping = (event) => {
    let formNameCount = this.state.keyCountName;
    let formPhoneCount = this.state.keyCountPhone;
    let formEmailCount = this.state.keyCountEmail;

    if (event.target.name === "formEntryName") {
      formNameCount = formNameCount + 1;
    } else 
    if (event.target.name === "formEntryPhone") {
      formPhoneCount = formPhoneCount + 1;
    } else
    if (event.target.name === "formEntryEmail") {
      formEmailCount = formEmailCount + 1;
    }
      
    //save values to state
    this.setState({
      [event.target.name]: event.target.value,
      keyCountName: formNameCount, 
      keyCountPhone:formPhoneCount,
      keyCountEmail: formEmailCount,
    })
  }
  //-------------revealing results section ------------------
  revealFn = () => {
    document.getElementById("results").classList.add("reveal");
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
        <Button clickFn={this.appClickCount} />
        <Scroll scrollFn={this.appScroll} />
        <Hover mouseEnterFn={this.mouseEnter} mouseLeaveFn={this.mouseLeave}/>
        <Form formTyping={this.formTyping}/>
        <Result 
          revealFn={this.revealFn}
          click={this.state.clickCount} 
          scrollThrough={this.state.totalScrollThrough}
          scrollTime={this.state.totalScrollTime}
          totalHoverCount={this.state.totalHoverCount}
          totalHoverTime={this.state.totalHoverTime}
          visit={this.state.totalVisit} 
          avgClick={this.state.avgClick}
          avgScrollThrough={this.state.avgScrollThrough}
          avgScrollTime={this.state.avgScrollTime}
          exitMidPage={this.state.exitMidPage}
          avgHoverCount={this.state.avgHoverCount}
          avgHoverTime={this.state.avgHoverTime}
          nameCount={this.state.keyCountName}
          phoneCount={this.state.keyCountPhone}
          emailCount={this.state.keyCountEmail}
          totalNameCount={this.state.formNameCount}
          totalPhoneCount={this.state.formPhoneCount}
          totalEmailCount={this.state.formEmailCount}
        />
        {/* ONLY ACTIVATE IF YOU REALLY FUCKED UP <button onClick={this.removeData}>Shit happened</button> */}
      </div>
    )
  };
}

export default App;
