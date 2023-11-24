import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserCard.css';
import UserVehicles from "../UserVehicles/UserVehicles";

function UserCard() {
    const [userData, setUserData] = useState(null);
    const [userVehicles, setUserVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_url");

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

        const fetchUserVehicles = async () => {
            try {
                const res = await axios.get(`${apiUrl}/vehicles/?current_owner=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });

                setUserVehicles(res.data);
            } catch (error) {
                setError('Error fetching user vehicles');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        fetchUserVehicles();
    }, [apiUrl, token, userId]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}, please reload page</div>;
    }

    const handleEditProfile = () => {
        window.location.href = `/profile/${userId}/edit`;
    };

    return (
        <>
            {userData && userVehicles &&
                <>
                    <div className="board">
                        <div className='uc'>
                            <div className="gradiant"></div>
                            <div className="profile-down">
                                <img src='' alt="" />
                                <div className="user-username">{userData.username}</div>
                                <div className="user-email">{userData.email}</div>
                                <div className="user-name"><span>Full Name:</span> {userData.first_name} {userData.last_name}</div>
                                <div className="user-vehicles">
                                    <span>Vehicle:</span>
                                    {userVehicles.map((vehicle) => (
                                        <div key={vehicle.registrationNumber} className="user-v">
                                            {vehicle.yearOfManufacture} {vehicle.colour} {vehicle.make} {vehicle.model}
                                        </div>
                                    ))}
                                </div>
                                <div className="user-group">{userData.groups}</div>
                            </div>
                            <div className="update-button" onClick={handleEditProfile}>Edit Profile</div>
                        </div>
                    </div>
                    <div>
                        <UserVehicles userVehicles={userVehicles} />
                    </div>
                </>}
        </>
    );
}

export default UserCard;
