import Nav from "react-bootstrap/Nav";
import React, { useState, useEffect } from "react";
import './Navbar.css'

function Navbar() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("access_token") !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);
    return (
        <div className="navbar">
            <Nav.Link href="/">Home</Nav.Link>
            <div className="user">
                <Nav className="me-auto">
                    {isAuth ? <Nav.Link href="/profile">Profile</Nav.Link> : null}
                </Nav>
                <Nav>
                    {isAuth ? (
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    ) : (
                        <Nav.Link href="./login">Login</Nav.Link>
                    )}
                </Nav>
            </div>
        </div>
    );
}

export default Navbar