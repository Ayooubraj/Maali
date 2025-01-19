import React from 'react';
import FilterPanel from '../../components/Filter/FilterPanel';
import './HomePage.css';

import gardener1 from '../../assets/images/gardener1.jpg';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
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
            <input
              type="text"
              className="search-bar__input"
              placeholder="Search for plants or tools"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Filter Panel */}
        <FilterPanel />

        {/* Flip Cards Section */}
        <div className="flip-cards-container">
          {/* First Card */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={gardener1}
                  alt="Gardener 1"
                />
                <div className="flip-card-overlay">Home Services</div>
              </div>
              <div className="flip-card-back">
                <h1>Home Service</h1>
                <p>Learn the best tips for your garden</p>
                <button onClick={() => alert('Home Service Button Clicked')}>
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={gardener1}
                  alt="Gardener 1"
                />
                <div className="flip-card-overlay">Plant Care</div>
              </div>
              <div className="flip-card-back">
                <h1>Plant Care</h1>
                <p>Essential plant care techniques</p>
                <button onClick={() => alert('Plant Care Button Clicked')}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
