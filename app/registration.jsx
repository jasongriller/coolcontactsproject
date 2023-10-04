"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
        const response = fetch("api/SignUp.php", {
            method: "POST",
            body: JSON.stringify(registrationData),
        });

        if (response === 200) {
            document.cookie = `session=${response.text}`;
            router.push('/dashboard');
        } else {
            alert("The server failed to register you in!");
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name"/>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}
