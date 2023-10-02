import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleDelete = () => {
    console.log("Contact deleted!");
    navigate("/");
  };

  return (
    <>
      <h2>Delete contact</h2>

      <form>
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
            disabled
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
            disabled
          />
        </div>
        <button
          onClick={handleDelete}
          className="btn btn-danger my-2"
        >
          Delete Contact
        </button>
      </form>
    </>
  );
};

export default DeleteContact;
