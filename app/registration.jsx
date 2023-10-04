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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
    
        //TODO: Change this to server IP once done
        const response = await fetch("http://localhost:8000/api/SignUp.php", {
          method: "POST",
          body: JSON.stringify(registrationData),
        });
    
        if (response.ok) {
          const sessionToken = await response.text();
          document.cookie = `session=${sessionToken}`;
          
          // Navigate to the dashboard
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
