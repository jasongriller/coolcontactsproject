"use client";
import React, { useState } from "react";
import { Contact } from "../../types";

const CreateContact = (props) => {
    const [contact, setContact] = useState<Contact>(({
        username: 'imaknight12',
        firstName: 'Ima',
        lastName: 'Knight',
        email: 'alexcartwright@ucf.edu',
        phoneNumber: '407-823-0000'
    }));

    const handleSubmit = (e) => {
        fetch("/CreateContact.php", {
            method: "POST",
            headers: {
                "Session-Token": document.cookie.split("=")[1],
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact)
        }).then((response) => {
            if (response.status !== 200) {
                alert("Failed to post your new contact to the server!");
            } else {
                alert("Success!");
                window.location.href = '/homepage';
            }
        })
        e.preventDefault();
    }

    const handleChange = (key: keyof Contact, value: any) => {
        setContact({...contact, [key]: value});
    }

    const contactElementsMap = (key: string): React.JSX.Element => {
        return (
            <div>
                <label>{key}</label>
                <input value={contact[key as keyof Contact]} onChange={(e) => handleChange(key as keyof Contact, e.target.value)}></input>
            </div>
        );
    }

    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                {Object.keys(contact).map(contactElementsMap)}
                <button type="submit">Add Contact</button>
            </form>
        </div>
    )
}

export default CreateContact;
