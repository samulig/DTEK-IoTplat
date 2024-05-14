import React, { useState } from 'react';
import axios from 'axios';

function AddSensor() {
  const [sensorId, setSensorId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      timestamp: new Date().toISOString(),
      metadata: {
        sensorId: parseInt(sensorId),
        type: 'temperature',
      },
      temp: 1, // Placeholder value
    };

    const result = await axios.post('http://localhost:3100/api/sensors/temperature/add', data);
    console.log(result.data);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form-container'>
        <div className='form-content'>
        <label>
          Sensor ID:
          <input className='input-field' type="text" value={sensorId} onChange={(e) => setSensorId(e.target.value)} />
          Only temperature sensors are supported.
        </label>
        </div>
      <div className='form-submit'>
        <button type="submit">Add Sensor</button>
      </div>
      </div>
    </form>
  );
}

export default AddSensor;