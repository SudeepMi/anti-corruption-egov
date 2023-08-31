import React from 'react'
import { Link } from 'react-router-dom'
import User from '../../utils/User'
import './style.css'
function Navbar() {

  const LogOut = () => {
    User()?.logOut();
    window.location.reload()
  }
  return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <Link className="navbar_brand" to="/">ACP</Link>
            <Link className='navbar_links' to="/about">About Project</Link>
            {/* <Link className='navbar_links' to="/ecommerce">Shopping</Link> */}
            <Link className='navbar_links' to="/news">News</Link>
            <Link className='navbar_links' to="/marketplace">Explore</Link>
            {/* { !User() ? <Link className='navbar_links btn btn_small_black' to="/login">Login</Link>
            : <>
                <Link className='navbar_links' to="/dashboard">Dashboard</Link>
            <button className='navbar_links btn btn_small_brand' onClick={()=>LogOut()}>Logout</button>
            </>} */}
        </nav>
  )
}

export default Navbar