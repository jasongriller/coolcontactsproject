"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Contact } from "../types";

const HomePage = (props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
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

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    );

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
                    <button className="edit-button" onClick={(e) => {
                        e.preventDefault();
                        router.push("/dashboard/updatecontact?" + createQueryString('current', encodeURIComponent(JSON.stringify(c))));
                    }}>
                        Edit
                    </button>
                    {/* <a href={"/path/to/deletecontact"}>
                        <button className="delete-button">
                            Delete
                        </button>
                    </a> */}
                </div>
            </div>
        );
    }

    const handleLogOutBtnClick = () => {
        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Expires cookie, deleting instantly
        router.push("../");
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
            <button className="log-out-btn" onClick={handleLogOutBtnClick}>Log Out</button>
        </div>
    );
}

export default HomePage;
