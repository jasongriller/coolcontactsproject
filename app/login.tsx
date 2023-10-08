"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SessionTokenResponse } from "./types";

export const Login = (props) => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        fetch("/api/SignIn.php", {
            method: "POST",
            body: JSON.stringify({ email: email, password: password })
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((wrapped: SessionTokenResponse) => {
                    document.cookie = `session=${wrapped.sessionToken}; path=/;`;
                    router.push('/dashboard');
                });
            } else {
                alert("The server failed to sign you in!");
            }
        });
    }

    return (
        <><h1>COP4331 Small Project Group 19's Contact Manager</h1><div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button type="submit" className="get-in-btn">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div></>
    )
}