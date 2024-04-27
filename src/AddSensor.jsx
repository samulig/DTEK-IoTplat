import React, { useState } from 'react';
import axios from 'axios';

function AddSensor() {
  const [sensorId, setSensorId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.post('/api/sensors/temperature', { sensorId });
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