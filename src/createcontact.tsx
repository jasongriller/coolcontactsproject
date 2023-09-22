import React, { useState } from "react";
import { Contact } from "./types";

export const Login = (props) => {
    const [contact, setContact] = useState<Contact>(({
        firstName: 'Ima',
        lastName: 'Knight',
        email: 'alexcartwright@ucf.edu',
        phoneNumber: '407-823-0000'
    }));

    const handleSubmit = (e) => {
        fetch("/CreateContact.php", {
            method: "POST",
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

    return (
    )
}