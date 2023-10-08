"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Contact } from "../../types";

const UpdateContact = (props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentContact: Contact = JSON.parse(searchParams.get("current"));

  const [contact, setContact] = useState<Contact>((currentContact));

  const handleSubmit = (e) => {
    fetch("/api/UpdateContact.php", {
      method: "POST",
      headers: {
        "Session-Token": document.cookie.split("=")[1],
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "original": currentContact,
        "new": contact
      })
    }).then((response) => {
      if (response.status !== 200) {
        alert("Failed to post your changes to the server!");
      } else {
        alert("Success!");
        router.push("/dashboard");
      }
    });
    e.preventDefault();
  }

  const handleChange = (key: keyof Contact, value: any) => {
    setContact({ ...contact, [key]: value });
  }

  const handleBackButtonClick = () => {
    router.push("/dashboard");
  }

  const fieldDisplayNames = {
      username: "Username",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phoneNumber: "Phone Number",
  };

  const contactElementsMap = (key: string): React.JSX.Element => {
    return (
        <div key={key}>
        <label htmlFor={key}>{fieldDisplayNames[key]}</label>
            <input type="text" id={key} name={key} value={contact[key]} />
        </div>
    );
  }

  const deleteContactFlow = () => {
    const choice = window.confirm("Are you sure you want to delete " + contact.firstName + " " + contact.lastName + "?");
    if (choice) {
      fetch("http://localhost:8000/api/RemoveContact.php", {
        method: "POST",
        headers: {
          "Session-Token": document.cookie.split("=")[1],
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact)
      }).then((response) => {
        if (response.status !== 200) {
          alert("Failed to delete this contact on the server!");
        } else {
          alert("Success!");
          router.push("/dashboard");
        }
      });
    }
  };

  return (
    <div className="auth-form-container">
      <button className="back-btn" onClick={handleBackButtonClick}>Back</button>
      <form className="login-form" onSubmit={handleSubmit}>
        {Object.keys(contact).map(contactElementsMap)}
        &nbsp;
        <button type="submit">Update Contact</button>
      </form>
      &nbsp;
      <button type="button" onClick={deleteContactFlow}>Delete Contact</button>
    </div>
  )
}

export default UpdateContact;
