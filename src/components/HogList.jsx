import React from "react";
import HogCard from "./HogCard";

function HogList(props) {
  // props.hogs is a list of all the hogs we want to show
  // props.onHideHog is a function that hides a hog when "Hide Me" is clicked

  // store each HogCard in this array so we can show them later
  const hogCards = [];

  // go through each hog and make a HogCard component for it
  for (let i = 0; i < props.hogs.length; i++) {
    const hog = props.hogs[i];

    hogCards.push(
      <div key={hog.name} className="ui eight wide column">
        <HogCard hog={hog} onHideHog={props.onHideHog} />
      </div>
    );
  }

  // sow all the cards inside a grid layout
  return <div className="ui grid container">{hogCards}</div>;
}

export default HogList;
