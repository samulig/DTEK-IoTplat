import { useState, useEffect } from 'react'
import './main.css';
import Monitor from './Monitor';
import Menu from './Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddSensor from './AddSensor';
import Apidoc from './apidoc';

const title = import.meta.env.VITE_TITLE;

function App() {
  const [sensorIds, setSensorIds] = useState([])

  useEffect(() => {
    const fetchSensorIds = () => {
      fetch('http://localhost:3100/api/sensors/temperature')
        .then(response => response.json())
        .then(data => setSensorIds(data.sensors))
        .catch(error => console.error('Error:', error));
    };
  
    // Fetch sensor IDs immediately
    fetchSensorIds();
  
    // Then fetch sensor IDs every 5 seconds
    const intervalId = setInterval(fetchSensorIds, 5000);
  
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Router>
    <div className='app-container'>
      <div className='menu'>
        <h1>{title}</h1>
        <Menu />
      </div>
    <div className='content'>
    <Routes>
    <Route path="/" element ={
        <div className='monitor-grid'>
            {sensorIds.sort((a, b) => a - b).map(sensorId => (
            <Monitor key={sensorId} sensorId={sensorId} />
            ))}
        </div>
      }>
        </Route>
      <Route path="/add-sensor" element={<AddSensor />}>
      </Route>
      <Route path="/apidoc" element={<Apidoc />}>
        </Route>
      </Routes>
      </div>
    </div>
    </Router>
  )
}

export default App
