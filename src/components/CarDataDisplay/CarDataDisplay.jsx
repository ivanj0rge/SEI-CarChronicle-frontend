import React from 'react';
import './CarDataDisplay.css'

function CarDataDisplay({ data }) {
    data = JSON.parse(data)

    return (
        <div className="your-board">
            <h3>Vehicle Details</h3>
            {data ? (
                <div className="row">
                    {Object.keys(data).map((key) => (
                        <div key={key} className="col-lg-4 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{key}</h5>
                                    <p className="card-text">{data[key]}</p>
                                </div>
                            </div>
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

