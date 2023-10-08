"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Contact } from "../../types";

const CreateContact = (props) => {
    const router = useRouter();

    const [contact, setContact] = useState<Contact>(({
        username: 'imaknight12',
        firstName: 'Ima',
        lastName: 'Knight',
        email: 'alexcartwright@ucf.edu',
        phoneNumber: '407-823-0000'
    }));

    const handleSubmit = (e) => {
        fetch("/api/CreateContact.php", {
            method: "POST",
            headers: {
                "Session-Token": document.cookie.substring(0, document.cookie.indexOf(';')),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact)
        }).then((response) => {
            if (response.status !== 200) {
                alert("Failed to post your new contact to the server!");
            } else {
                alert("Success!");
                router.push("/dashboard");
            }
        })
        e.preventDefault();
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

    const contactElementsMap = (key: keyof Contact): React.JSX.Element => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setContact((prevContact) => ({
              ...prevContact,
              [name]: value,
            }));
          };
        return (
            <div key={key}>
            <label htmlFor={key}>{fieldDisplayNames[key]}</label>
                <input type="text" id={key} name={key} value={contact[key]} onChange={handleChange}/>
            </div>
        );
    }
    
    return (
        <div className="auth-form-container">
            <button className="back-btn" onClick={handleBackButtonClick}>Back</button>
            <form className="login-form" onSubmit={handleSubmit}>
                {Object.keys(contact).map(contactElementsMap)}
                <button type="submit">Add Contact</button>
            </form>
        </div>
    )
}

export default CreateContact;
