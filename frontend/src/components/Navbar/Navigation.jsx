import React, { useState } from 'react';
import './Navbar.css'; // Importing the CSS for the Navbar
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={require('../../assets/images/logo1.png')} alt="Logo" />
      </div>

     
      
      <ul className="navbar__links">
        <li><a href="#">Home</a></li>
        <li><a href="#/product">Products</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      <div className="navbar__search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for plants or tools"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <button className="navbar__login">
        <FaUserCircle className="avatar-icon" />
        Login
      </button>
    </nav>
  );
};

export default Navbar;



