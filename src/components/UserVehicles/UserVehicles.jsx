import React, { useState } from 'react';
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
    const token = localStorage.getItem("access_token");
    const [showHistory, setShowHistory] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [history, setHistory] = useState([]);
    const [newHistory, setNewHistory] = useState({
        vehicle: '',
        date: '',
        mileage: 0,
        service_type: '',
        description: '',
    });

    const handleSeeHistoryClick = (vehicle) => {
        setShowHistory(true);
        setSelectedVehicle(vehicle);
        fetchHistory(vehicle.registrationNumber);
    };

    const fetchHistory = async (vehicleId) => {
        try {
            const response = await axios.get(`${apiUrl}/vehicles/${vehicleId}/history/`);
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    const handleRemove = async (vehicleId) => {
        try {
            await axios.patch(`${apiUrl}/vehicles/${vehicleId}/`,
                { current_owner: null },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

        } catch (error) {
            console.error('Error removing vehicle owner:', error.message);
        }
    };

const handleCreateHistory = async () => {
    try {
        const response = await axios.post(`${apiUrl}/vehicles/${selectedVehicle.registrationNumber}/history/`, {
            ...newHistory,
            vehicle_registration_number: selectedVehicle.registrationNumber,
            vehicle: selectedVehicle.registrationNumber, 
        });
        setHistory([...history, response.data]);
        setNewHistory({
            vehicle_registration_number: selectedVehicle.registrationNumber,
            vehicle: selectedVehicle.registrationNumber, 
            date: '',
            mileage: 0,
            service_type: '',
            description: '',
        });
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

    return (
        <div className='card-page'>
            <h2>User Vehicles</h2>
            <div className="vehicle-card">
                {userVehicles.map((vehicle) => (
                    <div key={vehicle.registrationNumber} className="user-vehicle">
                        <div className="registration">
                            {vehicle.registrationNumber}
                        </div>
                        <div className="details">Make: <span>{vehicle.make}</span></div>
                        <div className="details">Model: <span>{vehicle.model}</span></div>
                        <div className="details">Colour: <span>{vehicle.colour}</span></div>
                        <div className="details">Year: <span>{vehicle.yearOfManufacture}</span></div>
                        <div className="details">Fuel: <span>{vehicle.fuel_type}</span></div>
                        <div className="details">Engine: <span>{vehicle.engineCapacity}</span></div>
                        <div className="details">Previous Reg Owners: <span>{vehicle.previous_owners_count}</span></div>
                        <button onClick={() => handleSeeHistoryClick(vehicle)}>See History</button>
                        <button onClick={() => handleRemove(vehicle.registrationNumber)}>Remove</button>
                    </div>
                ))}
            </div>

            {showHistory && (
                <div>
                    <h2>History</h2>
                    <ul>
                        {history.map((h) => (
                            <li key={h.history_id}>
                                {`${SERVICE_TYPES[h.service_type]} on ${h.date}, ${h.description}`}
                                <button onClick={() => handleDeleteHistory(h.history_id)}>Delete</button>
                            </li>
                        ))}
                    </ul>

                    <h3>Add New History</h3>
                    <div>
                        <label>Date:</label>
                        <input type="date" value={newHistory.date} onChange={(e) => setNewHistory({ ...newHistory, date: e.target.value })} />
                    </div>
                    <div>
                        <label>Mileage:</label>
                        <input type="number" value={newHistory.mileage} onChange={(e) => setNewHistory({ ...newHistory, mileage: e.target.value })} />
                    </div>
                    <div>
                        <label>Service Type:</label>
                        <select value={newHistory.service_type} onChange={(e) => setNewHistory({ ...newHistory, service_type: e.target.value })}>
                            {Object.keys(SERVICE_TYPES).map((type) => (
                                <option key={type} value={type}>{SERVICE_TYPES[type]}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea value={newHistory.description} onChange={(e) => setNewHistory({ ...newHistory, description: e.target.value })} />
                    </div>
                    <button onClick={handleCreateHistory}>Create History</button>
                </div>
            )}
        </div>
    );
}

export default UserVehicles;
