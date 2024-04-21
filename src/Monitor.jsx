import { useEffect, useState } from 'react'
import './main.css';

function Monitor() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3100/api/testing')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, [])

  return (
    <div className='monitor'>
      <p>Value: {JSON.stringify(data)}</p>
    </div>
  )
}

export default Monitor
