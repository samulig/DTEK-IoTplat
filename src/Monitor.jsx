import { useState } from 'react'
import './main.css';

function Monitor() {
  const [count, setCount] = useState(0)

  return (
    <div className='monitor'>
      <p>Value: </p>
    </div>
  )
}

export default Monitor
