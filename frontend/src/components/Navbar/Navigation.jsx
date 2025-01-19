import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css'; // Importing the CSS for the Navbar
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={require('../../assets/images/logo1.png')} alt="Logo" />
      </div>

     
      
      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Products</Link></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
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

      <Link to="/login" className="navbar__login">
        <FaUserCircle className="avatar-icon" />
        Login
      </Link>
    </nav>
  );
};

export default Navbar;



