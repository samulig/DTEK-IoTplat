import { useEffect, useState } from 'react'
import './main.css';
import { Link } from 'react-router-dom';


function Menu(props) {
  const [data, setData] = useState(null)

  return (
    <div>
      <Link to="/" className='menu-item'><div>All sensors</div></Link>
      <Link to="/add-sensor" className='menu-item'><div>Add Sensor</div></Link>
      <Link to="/apidoc" className='menu-item'><div>Apidoc</div></Link>
    </div>
  )
}

export default Menu
