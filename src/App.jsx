import { useState } from 'react'
import './main.css';
import Monitor from './Monitor';

const title = import.meta.env.VITE_TITLE;

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <div>
      <h1>{title}</h1>
    </div>
    <div>
      <Monitor />
      <Monitor />
    </div>
    </>
  )
}

export default App
