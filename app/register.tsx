"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SessionTokenResponse } from "./types";

export const Register = (props) => 
{
    const router = useRouter();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const registrationData = {
        name: name,
        email: email,
        password: password,
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        console.log(email);
        fetch("/api/SignUp.php", {
            method: "POST",
            body: JSON.stringify(registrationData),
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((wrapped: SessionTokenResponse) => {
                    document.cookie = `session=${wrapped.sessionToken}`;
                    router.push('/dashboard');
                });
            } else {
                alert("The server failed to register you!");
            }
        });
    }

    return (
        <><h1>COP4331 Small Project Group 19's Contact Manager</h1><div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button type="submit" className="get-in-btn">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div></>
    )
}
