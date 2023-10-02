"use client";
import React, { useState } from "react";

const UpdateContact = () => {
  // State to hold user details
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Function to handle form submission (without API call)
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with the following data:");
    console.log(userDetails);
  };

  return (
    <>
      <h2>Update your contact</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Name Of Person
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email Of Person
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <input
          type="submit"
          value="Save Changes"
          className="btn btn-info my-2"
        />
      </form>
    </>
  );
};

export default UpdateContact;
