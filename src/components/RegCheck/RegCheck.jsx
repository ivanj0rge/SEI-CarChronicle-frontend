import React, { useState } from 'react';
import gbflag from '../Assets/gbflag.jpg';
import './RegCheck.css';
import CarDataDisplay from '../CarDataDisplay/CarDataDisplay';

function RegCheck() {
    const [VRN, setVRN] = useState('');
    const [result, setResult] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleRedirect = (path) => {
        window.location.href = path;
    };

    const handleCheckRegistration = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(
                `${apiUrl}/proxy/`, {
                    method: "POST",
                    body: JSON.stringify({ registrationNumber: VRN })
                }
            );

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setResult(`${JSON.stringify(responseData)}`);
            } else {
                console.error('Error checking registration:', response.statusText);
                setResult(null);
            }
        } catch (error) {
            console.error('Error checking registration:', error.message);
            setResult(null);
        }
    };

    const handleRegisterOwnership = () => {
        handleRedirect(`/register-ownership/${VRN}`);
    };

    return (
        <div>
            <div className="check-container">
                <h2 className='v'>Vehicle Registration Checker</h2>
                <form onSubmit={handleCheckRegistration}>
                    <div className="reg-container">
                        <img src={gbflag} alt="" />
                        <input
                            placeholder="Enter Reg"
                            type="text"
                            value={VRN}
                            onChange={(e) => setVRN(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                        />
                    </div>
                    <button className="check" type="submit">
                        Check Now
                    </button>
                </form>
            </div>
            {result !== null ? (
                <>
                    <CarDataDisplay data={result} />
                        <button className="add-car" onClick={handleRegisterOwnership}>
                        Register Ownership
                        </button>
                </>
            ) : (
                <p>Please search your registration number...</p>
            )}
        </div>
    );
}

export default RegCheck;
