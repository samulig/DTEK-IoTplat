import { useEffect, useState } from 'react'
import './main.css';

let data = ""

function Monitor() {
  const [data, setData] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3100/api/testing')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, [])

  useEffect(() => {
    fetch('http://localhost:3100/api/count')
      .then(response => response.json())
      .then(total => setTotal(total))
      .catch(error => console.error('Error:', error));
  }, [])

  return (
    <div className='monitor'>
      <p>Value: {JSON.stringify(data)}</p>
      <br></br>
      <p>Total amount of documents: {JSON.stringify(total)}</p>
    </div>
  )
}

export default Monitor
