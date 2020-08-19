import React, {useState, useEffect} from 'react';

const Scroll = ({scrollFn}) => {
  
  // const initialClick = [];
  // const [elapsedTimeArray, setElapsedTimeArray] = useState(initialClick);
  const initialScrollState = false;
  const [lastSectionState, setLastSectionState] = useState(initialScrollState);
  const initialEntryDate = {};
  const [scrollEntryTime, setScrollEntryTime] = useState(initialEntryDate);
  const initialExitDate = {};
  const [scrollExitTime, setScrollExitTime] = useState(initialExitDate);

  useEffect(() => {
    showVisible();
    window.addEventListener("scroll", showVisible, false);
  }, []);

  //see if scroll section is in the viewport
  const isVisible = (elem) => {

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
  const showVisible = () => {
    let section = document.getElementById('scrollSection');
    let currentSectionState = isVisible(section);
    // let elapsedTimeArray = this.state.scrollElapsedArray; 

    // you weren't in the section and now you are
    if(!lastSectionState && currentSectionState) {

      //record the entry time
      let entryTime = Date.now();
      setLastSectionState(true);
      setScrollEntryTime(entryTime);
      console.log(entryTime)
    } else // you were in the section, and now you aren't
    if(lastSectionState && !currentSectionState) { 

      // record the exit time
      let exitTime = Date.now();
      setLastSectionState(false);
      setScrollExitTime(exitTime);
      console.log(exitTime)
      //calculate time span for each entry and exit
      let elapsedTimeArray = [];
      let elapsedTime = scrollExitTime - scrollEntryTime;
      console.log(elapsedTime)
      elapsedTimeArray.push(elapsedTime);

      scrollFn(elapsedTimeArray)
    }
  }

  return (
    <section className="scrollSection" id="scrollSection">
      <h2>Educated Humour</h2>
      <p>The Bachelors of Fine Arts’ blend of highbrow and lowbrow is evident in one of their promotional photos, taken one Saturday afternoon in front of the Arts building. A group of young people pensively stand on the steps dressed in togas obviously made from their bed sheets, while, off to the side, two guys salaciously pose in their underwear. Naturally, the security guard chased them away immediately (partly because there was a second grade spelling bee inside).</p>
      <p>As their sense of humour seems to be unwelcome on McGill grounds, the Bachelors of Fine Arts are taking to other venues – notably La Sala Rossa, where they will be performing on March 23. Formed by friends and fellow performers, the Bachelors are putting on their second show as a collective, entitled Live Miseducation II. Current McGill student and founding member Toby Houle described their clever and self-deprecating comedy as “reaching for the stars and falling in the shit.”</p>
      <p>The “loose collective,” as Houle describes it, currently comprises Houle, a comedian/poet/storyteller; McGill student Asaf “Safi” Gerchak – whom Houle describes as a “comedian-raconteur;” Chris During and his power-pop band the Bawdy Electric; comedians Chason Gordon and David Heti; and writer/photographer Ariel Fournier. The group’s style is evident from the material available on their web site. In one short story by Houle, Peter O’Toole appears at a suburban housewife’s door, and proceeds to pursue and seduce her with a vigour akin to Jason in Friday the 13th. Another post, by Gerchak, appears to be an essay on existentialism but ends up rambling on about the backspace key on a keyboard, referring to it as “a horrible pit of doom.”</p>
      <p>Though this will only be their second show as the Bachelors of Fine Arts, they have perfomed together numerous times, and each is established on the Montreal scene. “It happened that we were all working at a Second Cup and then we all sort of clicked as a group and it sort of snowballed from there,” said Houle. “Chris and Safi have played shows together and I have done shows with Chris. It has always been these inter-pairings of headliners with other people too, but I guess after our first show last year…we just decided that we wanted to make it more formal and just get name recognition for the collective.”</p>
      <p>The three Bachelors on the bill for Tuesday evening – Houle, Gerchak, and the Bawdy Electric – will be joined by Montreal comedians George Hamilton Braithwaite, who will act as MC between sets, and multi-occasion Just for Laughs performer Mike Paterson, who will play a musical comedy set under the moniker The Dan D. Lyons. Describing how they got acquainted with the other two, Houle explains, “Safi had been performing with [Paterson] previously…. It basically just comes down to wanting to perform with your friends. You meet people you like, you really get along, and you respect what they do and love what they do and it sort of just flows both ways.”</p>
      <p>Houle hopes, however, that the Bachelors of Fine Arts will be more than a comedy troupe and expand to become an art collective. “We’re sort of looking to diversify as much as possible,” says Houle. “In a perfect world, for example, one week there’d be a photo exposition that the Bawdy Electric might play at and the next week there’d be a comedy show with someone’s paintings in the front foyer. That kind of intermarriage would be ideal…. That’s what we’re shooting for as we keep cherry picking people from around.”</p>
      <p>In the meantime, each member will stick to his forte for the upcoming show – Gershak will perform stand-up comedy, Houle will recite original comedic folk tales, and During’s band, the Bawdy Electric, will play a set. However, each will try to come up with something unique and different from his previous performances. “It’s just not possible to do the same thing over and over again. I think we’re all just really restless souls in that regard…. We’re always just trying to shake it up and set ourselves different challenges and every time beat those,” said Houle.</p>
      <p>At a Bachelors show, the comedy arises from the clash of the Bachelors’ serious art collective intentions and sensibilities with their self-deprecating and campy shtick. Tomorrow night, they’ll reach for the pinnacles of the Attic Greeks while falling into the shit and getting their underwear and bed sheets dirty.</p>
      <p>The Bachelors of Fine Arts will be performing tomorrow night at 8 p.m. at Sala Rossa (4848 St. Laurent). Visit bachelorsoffinearts.wordpress.com for the group’s work and information about the show.</p>
    </section>
  )
}


export default Scroll;