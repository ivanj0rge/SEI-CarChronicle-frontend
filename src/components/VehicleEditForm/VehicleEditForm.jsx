import React from 'react'

function VehicleEditForm() {
  return (
    <form onSubmit={handleSubmit}>
                <label>
                    Registration Number:
                    <input type="text" name="RegistrationNumber" value={formData.registrationNumber || ''} onChange={handleChange} disabled />
                </label>
                <label>
                    Color:
                    <input type="text" name="color" value={formData.colour || ''} onChange={handleChange} disabled />
                </label>
                <label>
                    Make:
                    <input type="text" name="make" value={formData.make || ''} onChange={handleChange} disabled />
                </label>
                <label>
                    Model:
                    <input type="text" name="model" value={formData.model || ''} onChange={handleChange} />
                </label>
                <label>
                    Year:
                    <input type="text" name="year" value={formData.yearOfManufacture || ''} onChange={handleChange} disabled />
                </label>
                <label>
                    Fuel Type:
                    <input type="text" name="fuel_type" value={formData.fuelType || ''} onChange={handleChange} disabled />
                </label>
                <label>
                    Engine Capacity (cc):
                    <input type="text" name="cc" value={formData.engineCapacity || ''} onChange={handleChange} disabled />
                </label>
                <label>
                    V5C Number:
                    <input type="text" name="current_v5c_number" value={formData.current_v5c_number || ''} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
  )
}

export default VehicleEditForm