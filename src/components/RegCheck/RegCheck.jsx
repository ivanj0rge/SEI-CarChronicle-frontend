import React, { useState } from 'react';
import axios from 'axios';
import gbflag from '../Assets/gbflag.jpg'
import './RegCheck.css'

function RegCheck() {
    const [licensePlate, setLicensePlate] = useState('');
    const [result, setResult] = useState('');

    const handleCheckRegistration = async () => {
        try {
            const regApiUrl = 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry';
            const apiKey = process.env.REACT_APP_REG_API_KEY;

            const response = await axios.post(regApiUrl, {
                registrationNumber: licensePlate,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                params: {
                    // Any additional params can go here if needed
                },
            });

            console.log(response);
            // Assuming the API returns some data, update the result state
            setResult(`Registration details for ${licensePlate}: ${JSON.stringify(response.data)}`);
        } catch (error) {
            console.error('Error checking registration:', error.message);
            setResult(`Error checking registration for ${licensePlate}`);
        }
    };

    return (
        <div>
            <div className='check-container'>
            <h2>Car Registration Checker</h2>
                <form>
                    <div className='reg-container'>
                        <img src={gbflag} alt='' />
                        <input
                            data-val="true"
                            data-val-regex="Registration is not valid"
                            data-val-regex-pattern="(^[A-Za-z]{2}[0-9]{2}\s?[A-Za-z]{3}$)|(^[A-Za-z][0-9]{1,3}[A-Za-z]{3}$)|(^[A-Za-z]{3}[0-9]{1,3}[A-Za-z]$)|(^[0-9]{1,4}[A-Za-z]{1,2}$)|(^[0-9]{1,3}[A-Za-z]{1,3}$)|(^[A-Za-z]{1,2}[0-9]{1,4}$)|(^[A-Za-z]{1,3}[0-9]{1,3}$)|(^[A-Za-z]{1,3}[0-9]{1,4}$)|(^[0-9]{3}[DXdx]{1}[0-9]{3}$)"
                            data-val-required="Please enter a vehicle registration"
                            placeholder="Enter Reg"
                            type="text"
                            value={licensePlate}
                            onChange={(e) => setLicensePlate(e.target.value)}
                        />
                    </div>
                </form>
                <button className="check" onClick={handleCheckRegistration}>Check Now</button>
            </div>
            <div className='result'>
                {result}
            </div>
        </div>
    );
}

export default RegCheck;
