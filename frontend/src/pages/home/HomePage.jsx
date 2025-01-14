import React from 'react';
import './HomePage.css';
import { FaSearch } from 'react-icons/fa'; // Import a search icon

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <img
          src={require('../../assets/images/hero_img.png')}
          alt="Hero"
          className="hero__image"
        />
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">Welcome to Maali</h1>
            <p className="hero__description">
              Your one-stop shop for beautiful plants and garden accessories
            </p>
            <button className="hero__button">Shop Now</button>
          </div>
          <div className="hero__search-bar">
            <FaSearch className="search-bar__icon" /> {/* Embedded icon */}
            <input
              type="text"
              className="search-bar__input"
              placeholder="Search for plants or tools"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
