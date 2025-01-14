import React from 'react';
import './Navbar.css'; // Importing the CSS for the Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        {/* <img src={require('../../assets/images/logo1.png')} alt="Logo" /> */}
      </div>
      <ul className="navbar__links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
   
  );
};
 


export default Navbar;



