import React, { useState } from "react";

function AddHogForm(props) {
  // This state holds the form input values
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    weight: "",
    greased: false,
    highestMedal: "",
    image: "",
  });

  // This function runs whenever an input changes
  function handleChange(event) {
    // event.target has info about which input changed
    const name = event.target.name; // input's name attribute
    const type = event.target.type; // input type (text, checkbox, etc.)
    const value = type === "checkbox" ? event.target.checked : event.target.value;

    // Update the formData state with the new value for the changed input
    setFormData({
      ...formData, // copy old formData
      [name]: value, // update the changed field
    });
  }

  // This function runs when the form is submitted
  function handleSubmit(event) {
    event.preventDefault(); // stop page reload

    // Simple check: don't submit if name, specialty, or weight is empty
    if (!formData.name || !formData.specialty || !formData.weight) {
      return;
    }

    // Create a new hog object to add to the list
    const newHog = {
      name: formData.name,
      specialty: formData.specialty,
      weight: Number(formData.weight), // convert to number
      greased: formData.greased,
      "highest medal achieved": formData.highestMedal,
      image: formData.image,
    };

    // Call the function passed from parent to add the new hog
    props.onAddHog(newHog);

    // Clear the form fields after submit
    setFormData({
      name: "",
      specialty: "",
      weight: "",
      greased: false,
      highestMedal: "",
      image: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem 0" }}>
      <h2>Add a New Hog</h2>

      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        required
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="specialty" style={{ marginLeft: "1rem" }}>Specialty:</label>
      <input
        id="specialty"
        name="specialty"
        type="text"
        required
        value={formData.specialty}
        onChange={handleChange}
      />

      <label htmlFor="weight" style={{ marginLeft: "1rem" }}>Weight:</label>
      <input
        id="weight"
        name="weight"
        type="number"
        min="0"
        step="any"
        required
        value={formData.weight}
        onChange={handleChange}
      />

      <label htmlFor="greased" style={{ marginLeft: "1rem" }}>Greased?</label>
      <input
        id="greased"
        name="greased"
        type="checkbox"
        checked={formData.greased}
        onChange={handleChange}
      />

      <label htmlFor="highestMedal" style={{ marginLeft: "1rem" }}>Highest Medal Achieved:</label>
      <input
        id="highestMedal"
        name="highestMedal"
        type="text"
        value={formData.highestMedal}
        onChange={handleChange}
      />

      <label htmlFor="image" style={{ marginLeft: "1rem" }}>Image URL:</label>
      <input
        id="image"
        name="image"
        type="text"
        value={formData.image}
        onChange={handleChange}
      />

      <button type="submit" className="ui button primary" style={{ marginLeft: "1rem" }}>
        Add Hog
      </button>
    </form>
  );
}

export default AddHogForm;
