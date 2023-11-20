import React, { useEffect, useState } from 'react'
import axios from 'axios';

function CarHistory() {
    const [history, setHistory] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`${apiUrl}/histories/`);
                setHistory(response.data);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, [apiUrl]);

    return (
        <div>
            <h2>History</h2>
            <ul>
                {history.map((h) => (
                    <ul key={h.history_id}>{`On ${h.date}, ${h.vehicle.color} ${h.vehicle.model} of ${h.vehicle.current_owner.first_name} did ${h.service_type}. Mechanic: ${h.mechanic.first_name} from ${h.company.name}`}</ul>
                ))}
            </ul>
        </div>
    );
};

export default CarHistory