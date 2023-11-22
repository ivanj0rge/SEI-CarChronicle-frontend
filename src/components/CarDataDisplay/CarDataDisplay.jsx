import React from 'react';
import './CarDataDisplay'

function CarDataDisplay({ data }) {
    data = JSON.parse(data)
    return (
        <div>
            <h3>Vehicle Details</h3>
            {data ? (
                <div className='data-table'>
                    <div className='table-row header'>
                        <div className='table-cell'>Key</div>
                        <div className='table-cell'>Value</div>
                    </div>
                    {Object.keys(data).map((key) => (
                        <div className='table-row' key={key}>
                            <div className='table-cell'>{key}</div>
                            <div className='table-cell'>{data[key]}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No vehicle data available.</p>
            )}
        </div>
    );
}

export default CarDataDisplay;
