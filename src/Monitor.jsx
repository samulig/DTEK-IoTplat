import { useEffect, useState } from 'react'
import './main.css';

let data = ""

function Monitor(props) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchSensorData = () => {
      fetch(`http://localhost:3100/api/sensors/temperature/${props.sensorId}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error:', error));
    }

  fetchSensorData()
  const intervalId = setInterval(fetchSensorData, 5000)
  return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='monitor'>
      <strong> Sensor ID: {data && data.sensorData && data.sensorData.metadata && data.sensorData.metadata.sensorId}</strong>
      <p>Value: {data && data.sensorData && data.sensorData.temp}</p>
      <p>Sensor type: {data && data.sensorData && data.sensorData.metadata && data.sensorData.metadata.type}</p>
      <p>Timestamp: {data && data.sensorData && data.sensorData.timestamp}</p>
    </div>
  )
}

export default Monitor
