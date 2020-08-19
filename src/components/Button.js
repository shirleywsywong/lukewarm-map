import React , {useState} from 'react';

const Button = ({clickFn}) => {

  const initialClick = 0;
  const [clickCount, setClickCount] = useState(initialClick);
  //setClickCount is a function that sets the state of clickCount
  //anything that is passed into the setClickCount function becomes the value of clickCount, ie. if a string is passed, clickCount becomes a string

  //need to wrap the setClickCount function with another function b/c the only purpose for setClickCount is to set the state. Need to attach the function with the onClick listener and call it something else.
  const clickCounter = () => {
    const newCount = clickCount + 1 
    setClickCount(newCount)
    clickFn(newCount)
  }

  return (
    <section className="buttonSection">
      <button onClick={clickCounter}>Click this</button>
      <div>Button click count: {clickCount}</div>
    </section>
  )
}

export default Button;