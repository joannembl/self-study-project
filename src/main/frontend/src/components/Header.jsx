import React from "react";
import {Link} from "react-router-dom";

function Header() {

  return(
    <div className='header'>
      <img src='https://freepikpsd.com/file/2019/10/user-icons-png-8-Transparent-Images.png' alt='users-logo' />
      <ul>
        <li><Link to='/' className='link-btn'>Home</Link></li>
        <li><Link to='/users' className='link-btn'>Users</Link></li>
        <li><Link to='/create-user' className='link-btn'>Create User</Link></li>
      </ul>
    </div>
  )
}

export default Header
