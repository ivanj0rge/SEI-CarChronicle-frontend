import React, { useEffect, useState } from 'react'
import axios from 'axios';

function CompanyList() {
    const [companies, setCompanies] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${apiUrl}/companies/`);
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, [apiUrl]);

    return (
        <div>
            <h2>Companies</h2>
            <ul>
                {companies.map((company) => (
                    <ul key={company.company_number}>{`${company.company_number} - ${company.name} ${company.address}`}</ul>
                ))}
            </ul>
        </div>
    );
};

export default CompanyList