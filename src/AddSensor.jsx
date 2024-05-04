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
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Sensor ID:
          <input type="text" value={sensorId} onChange={(e) => setSensorId(e.target.value)} />
        </label>
      </div>
      <div>
        <button type="submit">Add Sensor</button>
      </div>
    </form>
  );
}

export default AddSensor;