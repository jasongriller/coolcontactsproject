import React, { useEffect, useState } from "react";
import { Contact } from "./types";

export const HomePage = (props) => {
    const [data, setData] = useState(({}));

    useEffect(() => {
        fetch("/SearchContacts.php?search=")
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, []);

    // TODO: Flesh out this map function
    // Will convert each contact in the API's response to an HTML element
    const mapContactJSONtoElement = (c: Contact): React.JSX.Element => {
        return (
            <ul>
                <li>Name: {c.firstName} {c.lastName}</li>
                <li>Blah blah blah</li>
            </ul>
        );
    }

    return (
        <div>
            <h1>Welcome to Cool Contacts</h1>
            <input type="text" placeholder="Search name, email, ..."></input>
            <div id="contactList">
                {(data as Contact[]).map(mapContactJSONtoElement)}
            </div>
        </div>
    );
}