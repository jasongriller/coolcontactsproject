import React, { useState } from "react";

export const Login = (props) => 
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        console.log(email);
        fetch("/SignIn.php", {
            method: "POST",
            body: JSON.stringify({ username: email, password: password })
        }).then((response) => {
            // if (response.status === 200) {
                document.cookie = `session=${response.text}`;
                window.location = '/homepage';
            // } else {
                alert("The server failed to sign you in!");
            // }
        });
    }

    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}