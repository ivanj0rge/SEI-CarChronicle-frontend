import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
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
    const [fail, setFail] = useState("");

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFail("")
        let reloadPage = false;

        try {
            if (action === ACTION_LOGIN && shouldSubmit) {
                const user = {
                    username: username,
                    password: password,
                };

                let response;

                try {
                    response = await axios.post(`${apiUrl}/token/`, user, {
                        headers: { "Content-Type": "application/json" },
                    });
                } catch (error) {
                    response = error.response;
                }
    
                const data = response.data || {};
                const token = data.access;
                
                if (!token) {
                    console.error("Invalid response from the server:", response);
                    setFail("Invalid credentials. Please Sign Up first.");
                    return;
                }
    
                const decoded = jwtDecode(token);

                localStorage.clear();
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);
                localStorage.setItem("user_url", decoded.user_id);
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;

                window.location.pathname = '/';

            } else if (action === ACTION_SIGN_UP && shouldSubmit) {
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
    
                    reloadPage = true
                } catch (error) {
                    console.error("Error creating user:", error);
                    setFail(error.response?.data.detail || "An error occurred while creating the user. Please try again.");
                }
            }
        } catch (fail) {
            console.error("Fail:", fail);
    
            if (action === ACTION_LOGIN) {
                if (fail.response && fail.response.status === 401) {
                    setFail("Incorrect password. Please check your password and try again.");
                } else {
                    setFail(fail.response?.data.detail || "An error occurred");
                }
            } else if (action === ACTION_SIGN_UP) {
                if (fail.response && fail.response.status === 400) {
                    setFail("Invalid credentials. Please check your username and password and try again.");
                } else {
                    setFail(fail.response?.data.detail || "An error occurred");
                }
            }
        } finally {
            if (reloadPage) {
                window.location.reload();
            }
        }
    };

    const handleToggleAction = (newAction) => {
        if (action !== newAction) {
            setAction(newAction);
            setFail("");
            setShouldSubmit(false);
        } else {
            setShouldSubmit(true);
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            {fail && <div className="error">{fail}</div>}
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
