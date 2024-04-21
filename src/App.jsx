import { useState } from 'react'
import './main.css';
import Monitor from './Monitor';

const title = import.meta.env.VITE_TITLE;
const lin_title = import.meta.env.VITE_LIN_TITLE;

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <div>
      <h1>{title}</h1>
      <h2>{lin_title}</h2>
    </div>
    <div>
      <Monitor />
      <Monitor />
    </div>
    </>
  )
}

export default App
