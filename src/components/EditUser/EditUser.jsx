import React, { useState, useEffect } from "react";
import axios from "axios";

function EditUser() {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        profile_picture: '',
    });

    const [profilePicture, setProfilePicture] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_url");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users/${userId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData({
                    ...response.data,
                });
            } catch (error) {
                setError("Error fetching user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [apiUrl, token, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        console.log(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("username", userData.username);
            formData.append("email", userData.email);
            formData.append("first_name", userData.first_name);
            formData.append("last_name", userData.last_name);
            formData.append("profile_picture", profilePicture);
            console.log(userData);

            if (userData.password) {
                formData.append("password", userData.password);
                formData.append("confirm_password", userData.confirm_password);
            }

            await axios.patch(`${apiUrl}/users/${userId}/update/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("User updated successfully");
        } catch (error) {
            setError("Error updating user");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                First Name:
                <input
                    type="text"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Last Name:
                <input
                    type="text"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Profile Picture:
                <input
                    type="file"
                    name="profile_picture"
                    onChange={handleFileChange}
                />
            </label>
            <br />
            <button type="submit">Save Changes</button>
        </form>
    );
}

export default EditUser;
