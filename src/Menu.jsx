import { useEffect, useState } from 'react'
import './main.css';
import { Link } from 'react-router-dom';


function Menu(props) {
  const [data, setData] = useState(null)

  return (
    <div>
      <Link to="/"><div className='menu-item'>All sensors</div></Link>
      <Link to="/add-sensor"><div className='menu-item'>Add Sensor</div></Link>
      <div className='menu-item'>Menu item 1</div>
    </div>
  )
}

export default Menu
