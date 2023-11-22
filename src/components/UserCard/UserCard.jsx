import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserCard.css';

function UserCard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("access_token");
    const userId= localStorage.getItem("user_url");
    
    useEffect(() => {


        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users/${userId}`, {
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
    }, [apiUrl, token, userId]);

    console.log(userData)
    console.log(token)


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleEditProfile = () => {
        window.location.href = `/profile/${userId}/edit`;
    };

    return (
        <div className='uc'>
            <div className="gradiant"></div>
            <div className="profile-down">
                <img src={userData.profile_picture} alt="" />
                <div className="user-name">{userData.username}</div>
                <div className="user-email">{userData.email}</div>
                <div className="user-vehicles"><span>Full Name:</span> {userData.first_name} {userData.last_name}</div>
                <div className="user-vehicles"><span>Vehicles:</span> {userData.vehicleList}</div>
                <div className="user-group">{userData.groups}</div>
            </div>
            <div className="update-button" onClick={handleEditProfile}>Edit Profile</div>
        </div>
    );
}

export default UserCard;
