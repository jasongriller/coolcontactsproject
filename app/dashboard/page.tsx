"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Contact } from "../types";

const HomePage = (props) => {
    const router = useRouter();
    const [data, setData] = useState(([]));
    const [searchExpanded, setSearchExpanded] = useState(false);

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
            <div key={c.username} className="contact-card">
                <div>
                    <div className="details">
                        Name: {c.firstName} {c.lastName}
                    </div>
                    <div>Username: {c.username}</div>
                    <div>Email: {c.email}</div>
                    <div>Phone: {c.phoneNumber}</div>
                </div>
                <div className="button-container">
                    <a href={"/dashboard/updatecontact?current="+JSON.stringify(c)}>
                        <button className="edit-button">
                            Edit
                        </button>
                    </a>
                    {/* <a href={"/path/to/deletecontact"}>
                        <button className="delete-button">
                            Delete
                        </button>
                    </a> */}
                </div>
            </div>
        );
    }

    const toggleSearchBar = () => {
        setSearchExpanded((prevExpanded) => !prevExpanded);
    };

    const handleOutsideClick = (e) => {
        const searchBar = document.querySelector(".search-bar");
      
        if (searchBar && !searchBar.contains(e.target)) {
          setSearchExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
      
        return () => {
          document.removeEventListener("click", handleOutsideClick);
        };
    }, []);
      
      

    useEffect(() => { searchForContacts(''); }, []); // Initial call, returning every contact

    return (
        <div>
          <h1>Welcome to Cool Contacts</h1>
          <input type="text" onChange={(e) => searchForContacts(e.target.value)} placeholder="Search names, emails, ..." className={`search-bar ${searchExpanded ? "expanded" : ""}`} onClick={toggleSearchBar}
          ></input>
          <div id="contactList">
            {(data as Contact[]).map(mapContactJSONtoElement)}
          </div>
          <button type="button" onClick={() => router.push("/dashboard/createcontact")} className="create-contact-button">
            Create Contact
          </button>
        </div>
      );
}

export default HomePage;
