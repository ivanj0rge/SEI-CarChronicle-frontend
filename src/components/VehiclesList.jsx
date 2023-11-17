import React, { useEffect, useState } from 'react'
import axios from 'axios';

function VehiclesList() {
    const [vehicles, setVehicles] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`${apiUrl}/vehicles/`);
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles();
    }, [apiUrl]);

    return (
        <div>
            <h2>Vehicles</h2>
            <ul>
                {vehicles.map((vehicle) => (
                    <ul key={vehicle.registration}>{`${vehicle.year} ${vehicle.make} ${vehicle.model}. REG: ${vehicle.registration}. Belongs to ${vehicle.current_owner.first_name}`}</ul>
                ))}
            </ul>
        </div>
    );
};

export default VehiclesList