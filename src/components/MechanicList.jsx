import React, { useEffect, useState } from 'react'
import axios from 'axios';

function MechanicList() {
    const [mechanics, setMechanics] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        
        const fetchMechanics = async () => {
            try {
                const response = await axios.get(`${apiUrl}/mechanics/`);
                setMechanics(response.data);
            } catch (error) {
                console.error('Error fetching mechanics:', error);
            }
        };

        fetchMechanics();
    }, [apiUrl]);

    return (
        <div>
            <h2>Mechanics</h2>
            <ul>
                {mechanics.map((mechanic) => (
                    <ul key={mechanic.mechanic_id}>{`${mechanic.first_name} ${mechanic.last_name} from ${mechanic.company.name}`}</ul>
                ))}
            </ul>
        </div>
    );
};
export default MechanicList