"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Contact } from "../types";

const HomePage = (props) => {
    const router = useRouter();
    const [data, setData] = useState(([]));

    const searchForContacts = (searchString: string) => {
        console.log("I was called with the query: " + searchString);

        fetch("/api/SearchContacts.php?search=" + encodeURIComponent(searchString), {
            headers: {
                "Session-Token": document.cookie.split("=")[1],
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    };

    // Converts each contact in the API's response to an HTML element
    const mapContactJSONtoElement = (c: Contact): React.JSX.Element => {
        return (
            <ul key={c.username}>
                <li>Name: {c.firstName} {c.lastName} (<Link href={"/dashboard/updatecontact?current="+JSON.stringify(c)}>Edit Contact</Link>)</li>
                <li>Username: {c.username}</li>
                <li>Email: {c.email}</li>
                <li>Phone: {c.phoneNumber}</li>button
            </ul>
        ); 
    }

    useEffect(() => { searchForContacts(''); }, []); // Initial call, returning every contact

    return (
        <div>
            <h1>Welcome to Cool Contacts</h1>
            <input type="text" onChange={(e) => searchForContacts(e.target.value)} placeholder="Search names, emails, ..."></input>
            <div id="contactList">
                {(data as Contact[]).map(mapContactJSONtoElement)}
            </div>
            <button type="button" onClick={() => router.push("/dashboard/createcontact")}>Create Contact</button>
        </div>
    );
}

export default HomePage;
