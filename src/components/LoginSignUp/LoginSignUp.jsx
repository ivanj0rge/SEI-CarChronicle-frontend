import axios from "axios";
import { useState } from "react";
import './LoginSignUp.css';
import iname from '../Assets/icon_name.png';
import iemail from '../Assets/icon__email.png';
import ipass from '../Assets/icon_password.png';

const ACTION_LOGIN = "Login";
const ACTION_SIGN_UP = "Sign Up";

function LoginSignUp() {
    const [action, setAction] = useState("Login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [error, setError] = useState("");

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleRedirect = (path) => {
        window.location.href = path;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (action === "Login" && shouldSubmit) {
                const user = {
                    username: username,
                    password: password,
                };

                const { data } = await axios.post(`${apiUrl}/token/`, user, {
                    headers: { "Content-Type": "application/json" },
                });

                localStorage.clear();
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
                handleRedirect("/");

            } else if (action === "Sign Up" && shouldSubmit) {
                const user = {
                    username: username,
                    email: email,
                    password: password,
                    confirm_password: confirmPassword,
                };

                try {
                    await axios.post(`${apiUrl}/create-user/`, user, {
                        headers: { "Content-Type": "application/json" },
                    });
            
                    // Redirect to login page after successful sign-up
                    handleRedirect("/login");
                } catch (error) {
                    setError(error.response.data.detail || "An error occurred");
                }
            }
        } catch (error) {
            setError(error.response.data.detail || "An error occurred");
        }
    };

    const handleToggleAction = (newAction) => {
        // Check if the action has changed before updating the state
        if (action !== newAction) {
            setAction(newAction);
            setError(""); // Clear any previous error messages
            setShouldSubmit(false); // Set shouldSubmit to false when toggling between Login and Sign Up
        } else {
            setShouldSubmit(true); // Set shouldSubmit to true when newAction is equal to the current action
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <form className="inputs" onSubmit={handleSubmit}>
                {action === ACTION_LOGIN ? (
                    <div className="input">
                        <img src={iname} alt='' />
                        <input
                            className="username"
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                ) : (
                    <>
                        <div className="input">
                            <img src={iname} alt='' />
                            <input
                                className="username"
                                type="text"
                                placeholder='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input">
                            <img src={iemail} alt='' />
                            <input
                                type="email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </>
                )}
                <div className="input">
                    <img src={ipass} alt='' />
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {action === ACTION_LOGIN ? null : (
                    <div className="input">
                        <img src={ipass} alt='' />
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                )}
                {action === ACTION_SIGN_UP ? null : (
                    <div className="forgot-password">
                        Forgot your password? <span>Click Here!</span>
                    </div>
                )}
                <div className="submit-container">
                    <button
                        type="submit"
                        className={action === ACTION_LOGIN ? 'submit gray' : 'submit'}
                        onClick={() => handleToggleAction(ACTION_SIGN_UP)}
                    >
                        Sign Up
                    </button>
                    <button
                        type="submit"
                        className={action === ACTION_SIGN_UP ? 'submit gray' : 'submit'}
                        onClick={() => handleToggleAction(ACTION_LOGIN)}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginSignUp;
