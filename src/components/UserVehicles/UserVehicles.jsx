import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserVehicles.css';

const SERVICE_TYPES = {
    minor: 'Minor Repair',
    major: 'Major Repair',
    service: 'Service',
    full: 'Full Service',
    mot: 'MOT',
    body: 'Body Work',
};

function UserVehicles({ userVehicles }) {
    const apiUrl = process.env.REACT_APP_API_URL;
    // eslint-disable-next-line
    const token = localStorage.getItem("access_token");
    const [showHistory, setShowHistory] = useState(false);
    const [showAddHistory, setShowAddHistory] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const userId = localStorage.getItem("user_url");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newHistory, setNewHistory] = useState({
        vehicle: '',
        date: '',
        mileage: 0,
        service_type: '',
        description: '',
    });

    useEffect(() => {
        const fetchUserVehicles = async () => {
            try {
                const response = await axios.get(`${apiUrl}/vehicles/?current_owner=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.data.length > 0) {
                    setNewHistory(prevState => ({
                        ...prevState,
                        vehicle: response.data[0].registrationNumber,
                    }));
                }
                setSelectedVehicle(response.data[0].registrationNumber)
                console.log(response.data[0].registrationNumber);
            } catch (error) {
                console.error('Error fetching user vehicles:', error);
            }
        };

        fetchUserVehicles();
    }, [apiUrl, token, userId]);


    const handleToggleHistory = async (vehicleId) => {
        if (showHistory) {
            setShowHistory(false);
        } else
            setShowHistory(true);
        setSelectedVehicle(vehicleId);
        fetchHistory(vehicleId);
    }

    const fetchHistory = async (vehicleId) => {
        try {
            setLoading(true)
            const selectedVehicle = userVehicles.find(vehicle => vehicle.registrationNumber === vehicleId);
            setSelectedVehicle(selectedVehicle)
            console.log(selectedVehicle);
            const response = await axios.get(`${apiUrl}/vehicles/${selectedVehicle}/history/`);
            setHistory(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching history:', error);
            setError('Error fetching history. Please try again.');
            setLoading(false);
        }
    };

    // const handleRemove = async (vehicleId) => {
    //     try {
    //         await axios.put(`${apiUrl}/vehicles/${vehicleId}/`,
    //             { current_owner: null },
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //     } catch (error) {
    //         console.error('Error removing vehicle owner:', error.message);
    //     }
    // };

    const handleCreateHistory = async () => {
        try {
            const response = await axios.post(`${apiUrl}/vehicles/${selectedVehicle}/history/`, {
                ...newHistory,
                vehicle_registration_number: selectedVehicle,
                vehicle: selectedVehicle,
            });
            setHistory([...history, response.data]);
            setNewHistory({
                vehicle_registration_number: selectedVehicle,
                vehicle: selectedVehicle,
                date: '',
                mileage: 0,
                service_type: '',
                description: '',
            });

            setShowAddHistory(false)

        } catch (error) {
            console.error('Error creating history:', error);
        }
    };

    const handleDeleteHistory = async (historyId) => {
        try {
            await axios.delete(`${apiUrl}/history/${historyId}/`);
            setHistory(history.filter((h) => h.history_id !== historyId));
        } catch (error) {
            console.error('Error deleting history:', error);
        }
    };

    // if (loading) {
    //     return <div className='loading'>Loading...</div>;
    // }

    // if (error) {
    //     return <div className='error'>{error}</div>;
    // }

    return (
        <div className='card-page'>
            <div className="vehicle-card">
                {userVehicles.map((vehicle) => (
                    <div key={selectedVehicle} className="user-vehicle">
                        <div className="registration">
                            {selectedVehicle}
                        </div>
                        <div className="details">Make: <span>{vehicle.make}</span></div>
                        <div className="details">Model: <span>{vehicle.model}</span></div>
                        <div className="details">Colour: <span>{vehicle.colour}</span></div>
                        <div className="details">Year: <span>{vehicle.yearOfManufacture}</span></div>
                        <div className="details">Fuel: <span>{vehicle.fuel_type}</span></div>
                        <div className="details">Engine: <span>{vehicle.engineCapacity}</span></div>
                        {/* <div className="details">Previous Reg Owners: <span>{vehicle.previous_owners_count}</span></div> */}
                        {/* <button onClick={() => handleRemove(vehicle.registrationNumber)}>Remove</button> */}
                        <button className='history' onClick={() => handleToggleHistory(!handleToggleHistory)}>
                            {showHistory ? 'Hide History' : 'See History'}
                        </button>
                    </div>
                ))}
            </div>

            {showHistory && (
                <div>
                    {loading && <div className='loading'>Loading...</div>}
                    {error && (
                        <div className='error'>
                            Error: {error}. Please try again.
                            {console.error(error)}
                        </div>
                    )}
                    {!loading && !error && (
                        <div>
                            <h2>Vehicle History</h2>
                            <ul>
                                {history.map((h) => (
                                    <li key={h.history_id}>
                                        {h && h.service_type && (
                                            <span>{`${SERVICE_TYPES[h.service_type]} on ${h.date}.`}</span>
                                        )}
                                        <br />
                                        {`${h.description}`}
                                        <button onClick={() => handleDeleteHistory(h.history_id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>

                            <button onClick={() => setShowAddHistory(!showAddHistory)}>
                                {showAddHistory ? 'Hide' : 'Add New Records'}
                            </button>

                            {showAddHistory && (
                                <div>
                                    <h3>Add New Record</h3>
                                    <div>
                                        <label>Date:</label>
                                        <input type='date' value={newHistory.date} onChange={(e) => setNewHistory({ ...newHistory, date: e.target.value })} />
                                    </div>
                                    <div>
                                        <label>Mileage:</label>
                                        <input type='number' value={newHistory.mileage} onChange={(e) => setNewHistory({ ...newHistory, mileage: e.target.value })} />
                                    </div>
                                    <div>
                                        <label>Service Type:</label>
                                        <select value={newHistory.service_type} onChange={(e) => setNewHistory({ ...newHistory, service_type: e.target.value })}>
                                            {Object.keys(SERVICE_TYPES).map((type) => (
                                                <option key={type} value={type}>
                                                    {SERVICE_TYPES[type]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label>Description:</label>
                                        <textarea value={newHistory.description} onChange={(e) => setNewHistory({ ...newHistory, description: e.target.value })} />
                                    </div>
                                    <button onClick={handleCreateHistory}>Create Record</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>

    )
}

export default UserVehicles;
