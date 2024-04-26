import { useState, useEffect } from 'react'
import './main.css';
import Monitor from './Monitor';

const title = import.meta.env.VITE_TITLE;

function App() {
  const [sensorIds, setSensorIds] = useState([])

  useEffect(() => {
    fetch('http://localhost:3100/api/sensors/temperature')
      .then(response => response.json())
      .then(data => setSensorIds(data.sensors))
      .catch(error => console.error('Error:', error));
  }, [])

  return (
    <>
      <div>
        <h1>{title}</h1>
        <h2>Hello.</h2>
      </div>
      <div>
        {sensorIds.map(sensorId => (
          <Monitor key={sensorId} sensorId={sensorId} />
        ))}
      </div>
    </>
  )
}

export default App
