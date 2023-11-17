import React, { useEffect, useState } from 'react'
import axios from 'axios';

function OwnerList() {
    const [owners, setOwners] = useState([]);

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await axios.get(`${REACT_APP_DATABASE_URL}/owners/`);
                setOwners(response.data);
            } catch (error) {
                console.error('Error fetching owners:', error);
            }
        };

        fetchOwners();
    }, []);

    return (
        <div>
            <h2>Owners</h2>
            <ul>
                {owners.map((owner) => (
                    <ul key={owner.owner_id}>{`${owner.owner_id} - ${owner.first_name} ${owner.last_name}`}</ul>
                ))}
            </ul>
        </div>
    );
};

export default OwnerList