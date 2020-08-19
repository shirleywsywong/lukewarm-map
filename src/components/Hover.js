import React, {useState, useEffect, useRef} from 'react';

const Hover = ({hoverFn}) => {
  const initialEntry = 0;
  const [entryTime, setEntryTime] = useState(initialEntry);
  const initialExit = 0;
  const [exitTime, setExitTime] = useState(initialExit);
  const initialArray = [];
  const [hoverTimeArray, sethoverTimeArray] = useState(initialArray);
  //useEffect runs on 'component did mount', so need to useRef as control for first run
  const firstRunComplete = useRef(false);

  useEffect(() => {
    if (firstRunComplete.current) calculateTime();
    else firstRunComplete.current = true;
  }, [exitTime]);

  const mouseEnter = () => {
    const hoverEntryTime = Date.now();
    console.log(hoverEntryTime)
    setEntryTime(hoverEntryTime)
  }

  const mouseLeave = () => {
    const hoverExitTime = Date.now();
    console.log(hoverExitTime)
    setExitTime(hoverExitTime)
  }

  //calculate the difference b/t entry and exit, and record the difference in an array
  const calculateTime = () => {
    console.log(`calculate time`)
    let elapsedTime = exitTime - entryTime;
    let hoverElapsedArray = hoverTimeArray;
    hoverElapsedArray.push(elapsedTime)
    sethoverTimeArray(hoverElapsedArray)
    hoverFn(hoverTimeArray)
  }

  return (
    <section className="hoverSection flex">
      <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className="box">
        <p>Hover Me!</p>
      </div>
    </section>
  )
}

export default Hover;