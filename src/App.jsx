import { useState } from 'react'
import './main.css';
import Monitor from './Monitor';

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <div>
      <h1>DTEK-IoTplat</h1>
    </div>
    <div>
      <Monitor />
      <Monitor />
    </div>
    </>
  )
}

export default App
