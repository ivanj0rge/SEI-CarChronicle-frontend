import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserCard.css';
import tyson from '../Assets/tyson.jpg';

function UserCard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                setError('Error fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [apiUrl, token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='uc'>
            <div className="gradiant"></div>
            <div className="profile-down">
                <img src={tyson} alt="" />
                <div className="user-name">{userData.name}</div>
                <div className="user-email">{userData.email}</div>
                <div className="user-vehicles"><span>Vehicles:</span> {userData.vehicleList}</div>
                <div className="user-group">{userData.group}</div>
            </div>
            <div className="update-button">Edit Profile</div>
        </div>
    );
}

export default UserCard;
