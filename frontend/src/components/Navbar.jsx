import React,{useState} from 'react'
import {Link,NavLink} from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
const [menuOpen, setMenuOpen] = useState(false);
  return <nav>
    <Link to="/" className="title">
        ComedSark
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    <ul className={menuOpen ? "open" : ""}>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/register'>Register</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
    </ul>
  </nav>
}

export default Navbar;