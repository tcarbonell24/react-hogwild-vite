import React, { useState } from "react";

function HogCard(props) {
  // This lets us track if the extra hog info should be shown or hidden
  const [showDetails, setShowDetails] = useState(false);

  // This happens when the user clicks the card
  // It just flips the value of showDetails between true and false
  function handleClick() {
    if (showDetails === false) {
      setShowDetails(true); // show the extra info
    } else {
      setShowDetails(false); // hide it
    }
  }

  // This runs when the "Hide Me" button is clicked
  // It tells the parent to hide this hog
  function handleHideClick(event) {
    event.stopPropagation(); // so the card click doesn't also happen
    props.onHideHog(props.hog.name); // call the function passed from App
  }

  // Just makes the code cleaner — easier to read if we use hog instead of props.hog
  const hog = props.hog;

  // If showDetails is true, we make this section of extra info
  let detailsSection = null;
  if (showDetails === true) {
    detailsSection = (
      <div className="content" style={{ marginTop: "10px" }}>
        <p>Specialty: {hog.specialty}</p>
        <p>{hog.weight}</p>
        <p>{hog.greased ? "Greased" : "Nongreased"}</p>
        <p>{hog["highest medal achieved"]}</p>
      </div>
    );
  }

  return (
    <div
      aria-label="hog card"
      className="ui card"
      style={{ margin: "10px", cursor: "pointer" }}
      onClick={handleClick} // clicking the whole card shows/hides details
    >
      <h3>{hog.name}</h3>
      <img
        src={hog.image}
        alt={"Photo of " + hog.name}
        style={{ width: "100%" }}
      />

      {/* Show the details if user has clicked to expand */}
      {detailsSection}

      {/* Button to hide this card completely */}
      <button
        className="ui button red"
        onClick={handleHideClick}
        style={{ marginTop: "10px" }}
      >
        Hide Me
      </button>
    </div>
  );
}

export default HogCard;
