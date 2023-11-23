import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RegisterOwnership() {
    const { registration } = useParams();
    const [formData, setFormData] = useState({
        registrationNumber: '',
        colour: '',
        make: '',
        model: '',
        yearOfManufacture: '',
        fuelType: '',
        engineCapacity: '',
        current_v5c_number: '',
    });
    // const [carData, setCarData] = useState('')
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token")

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('access_token');

        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/proxy/`, {
                    method: 'POST',
                    body: JSON.stringify({ registrationNumber: registration })
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    const { registrationNumber, colour, make, model, yearOfManufacture, fuelType, engineCapacity, current_v5c_number } = data;
    
                    setFormData({
                        registrationNumber,
                        colour,
                        make,
                        model,
                        yearOfManufacture,
                        fuelType,
                        engineCapacity,
                        current_v5c_number,
                    });
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        if (isAuthenticated) {
            fetchData();
        } else {
            navigate('/login');
        }
    }, [registration, navigate, apiUrl]);

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${apiUrl}/vehicles/`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                navigate('/profile');
            } else {
                console.error('Error registering ownership:', response.statusText);
            }
        } catch (error) {
            console.error('Error registering ownership:', error.message);
        }
    };


    return (
        <div>
            <h2>Register Ownership</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Registration Number:
                    <input type="text" name="RegistrationNumber" value={formData.registrationNumber || ''} onChange={handleChange} disabled />
                </label>
                <label>
                    Color:
                    <input type="text" name="color" value={formData.colour || ''} onChange={handleChange} disabled />
                </label>
                <label>
                    Make:
                    <input type="text" name="make" value={formData.make || ''} onChange={handleChange} disabled />
                </label>
                <label>
                    Model:
                    <input type="text" name="model" value={formData.model || ''} onChange={handleChange} />
                </label>
                <label>
                    Year:
                    <input type="text" name="year" value={formData.yearOfManufacture || ''} onChange={handleChange} disabled />
                </label>
                <label>
                    Fuel Type:
                    <input type="text" name="fuel_type" value={formData.fuelType || ''} onChange={handleChange} disabled />
                </label>
                <label>
                    Engine Capacity (cc):
                    <input type="text" name="cc" value={formData.engineCapacity || ''} onChange={handleChange} disabled />
                </label>
                <label>
                    V5C Number:
                    <input type="text" name="current_v5c_number" value={formData.current_v5c_number || ''} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RegisterOwnership;
