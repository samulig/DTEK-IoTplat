import { useState, useEffect } from 'react'
import './main.css';
import Monitor from './Monitor';
import Menu from './Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddSensor from './AddSensor';

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
            {sensorIds.map(sensorId => (
            <Monitor key={sensorId} sensorId={sensorId} />
          ))}
        </div>
      }>
        </Route>
      <Route path="/add-sensor" element={<AddSensor />}>
      </Route>
      </Routes>
      </div>
    </div>
    </Router>
  )
}

export default App
