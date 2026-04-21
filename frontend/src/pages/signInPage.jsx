import { useState } from 'react';
import dotenv from 'dotenv';


export default function SignInPage({ userSignedIn }) {
    const [isLogin, setLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const doOnSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isLogin ? "/login" : "/register";

        try {
            const loginRes = await fetch(`http://localhost:8080/auth${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email, password: password })
            });

            const responseData = await loginRes.json();

            if (responseData.ok && isLogin) {
                userSignedIn({
                    token: responseData.token,
                    user: responseData.user
                });
            } else {
                setMessage(responseData.message);
            }

        } catch (error) {
            setMessage("Internal Server Error with SignIn/Registration");
            console.log(error.message)
        }
    }

    return (
        <div>
            <h1>{isLogin ? "Login" : "Register New Account"}</h1>

            <form onSubmit = {doOnSubmit}>
                <input
                    type="email"
                    placeholder="enter email address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit"> {isLogin ? "Log In" : "Register New Account"}</button>
            </form>

            {message && <p>{message}</p>}

            <button onClick = {() => setLogin(!isLogin)}>
                {isLogin ? "Need an account? Sign Up" : "Already have an account? Log In"}
            </button>
        </div>

    )
}