import React, { useEffect, useState } from "react";

export const HomePage = (props) => {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        fetch("/SearchContacts.php?search=")
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, []);
}