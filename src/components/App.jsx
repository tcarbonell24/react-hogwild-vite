import React, { useState } from "react";
import Nav from "./Nav";
import hogsData from "../porkers_data";
import HogList from "./HogList";
import AddHogForm from "./AddHogForm";

function App() {
  // This state keeps all the hogs we have
  const [hogs, setHogs] = useState(hogsData);

  // This state tracks if we only want to see greased hogs
  const [greasedOnly, setGreasedOnly] = useState(false);

  // This state keeps track of how we want to sort hogs: by name or weight
  const [sortBy, setSortBy] = useState(""); // "" means no sorting

  // This state holds names of hogs that we have hidden
  const [hiddenHogs, setHiddenHogs] = useState([]);

  // When the "Greased Pigs Only?" checkbox changes, update the filter state
  function handleGreasedChange() {
    setGreasedOnly((prev) => !prev);
  }

  // When we change the sort dropdown, update the sorting method
  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  // When we hide a hog, add its name to hiddenHogs so it disappears
  function handleHideHog(hogName) {
    setHiddenHogs((prev) => [...prev, hogName]);
  }

  // When a new hog is added via the form, add it to our hog list
  function handleAddHog(newHog) {
    setHogs((prev) => [...prev, newHog]);
  }

  // Get the list of hogs to show after filtering and hiding
  let displayedHogs = hogs.filter(
    (hog) => (!greasedOnly || hog.greased) && !hiddenHogs.includes(hog.name)
  );

  // Sort the hogs if sorting is selected
  if (sortBy === "name") {
    displayedHogs.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "weight") {
    displayedHogs.sort((a, b) => a.weight - b.weight);
  }

  return (
    <div className="App">
      {/* Navigation bar at the top */}
      <Nav />

      {/* Filter and sort controls */}
      <section style={{ margin: "1rem" }}>
        <label htmlFor="greased-filter">
          {/* Checkbox to filter greased hogs */}
          <input
            id="greased-filter"
            type="checkbox"
            checked={greasedOnly}
            onChange={handleGreasedChange}
          />
          {" "}Greased Pigs Only?
        </label>

        <label htmlFor="sort-by" style={{ marginLeft: "1rem" }}>
          Sort by:
          {/* Dropdown to select sorting method */}
          <select id="sort-by" value={sortBy} onChange={handleSortChange}>
            <option value="">No Sort</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
          </select>
        </label>
      </section>

      {/* Form to add a new hog */}
      <AddHogForm onAddHog={handleAddHog} />

      {/* List of hog cards */}
      <HogList hogs={displayedHogs} onHideHog={handleHideHog} />
    </div>
  );
}

export default App;
