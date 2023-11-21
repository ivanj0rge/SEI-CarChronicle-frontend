import React, { useState, useEffect } from 'react';
import axios from 'axios';
import gbflag from '../Assets/gbflag.jpg';
import './RegCheck.css';

function RegCheck() {
    const [VRN, setVRN] = useState('');
    const [result, setResult] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleCheckRegistration = async (e) => {
        e.preventDefault();

        try {
            const apiKey = process.env.REACT_APP_REG_API_KEY;

            const response = await axios.post(
                "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
                { registrationNumber: VRN },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                    },
                }
            );

            console.log(response);
            setResult(`Registration details for ${VRN}: ${JSON.stringify(response.data)}`);
        } catch (error) {
            console.error('Error checking registration:', error.message);
            setResult(`Error checking registration for ${VRN}`);
        }
    };

    useEffect(() => {
        
    }, [apiUrl]);

    return (
        <div>
            <div className="check-container">
                <h2>Car Registration Checker</h2>
                <form onSubmit={handleCheckRegistration}>
                    <div className="reg-container">
                        <img src={gbflag} alt="" />
                        <input
                            placeholder="Enter Reg"
                            type="text"
                            value={VRN}
                            onChange={(e) => setVRN(e.target.value)}
                        />
                    </div>
                    <button className="check" type="submit">
                        Check Now
                    </button>
                </form>
            </div>
            <div className="result">{result}</div>
        </div>
    );
}

export default RegCheck;
