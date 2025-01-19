import React from 'react';
import { useNavigate } from 'react-router-dom';
import FilterPanel from '../../components/Filter/FilterPanel';
import './HomePage.css';

import gardener1 from '../../assets/images/gardener1.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <img
          src={require('../../assets/images/hero_bgimg.png')}
          alt="Hero"
          className="hero__image"
        />
        <img
          src={require('../../assets/images/hero_img1.png')}
          alt="Hero Overlay"
          className="hero__overlay-image"
        />
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">Welcome to Maali</h1>
            <p className="hero__description">
              <h2>Book a gardener for your garden from home!</h2>
            </p>
            <button 
              className="hero__button"
              onClick={() => navigate('/HomeService')}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Filter Panel */}
        <div className="filter-container">
          <FilterPanel />
        </div>

        {/* Right Side Content */}
        <div className="featured-section">
          {/* Category Section - Now First */}
          <section className="category-section">
            <h2 className="category-section__title">Shop by Category</h2>
            <div className="category-container">
              <button className="scroll-button left" onClick={() => document.querySelector('.category-scroll').scrollBy(-200, 0)}>
                &lt;
              </button>
              <div className="category-scroll">
                <div className="category-item">
                  <div className="category-image">
                    <img src={require('../../assets/images/plant1.jpg')} alt="Indoor Plants" />
                  </div>
                  <p className="category-label">Indoor Plants</p>
                </div>
                <div className="category-item">
                  <div className="category-image">
                    <img src={require('../../assets/images/plant1.jpg')} alt="Outdoor Plants" />
                  </div>
                  <p className="category-label">Outdoor Plants</p>
                </div>
                <div className="category-item">
                  <div className="category-image">
                    <img src={require('../../assets/images/plant1.jpg')} alt="Gardening Tools" />
                  </div>
                  <p className="category-label">Gardening Tools</p>
                </div>
                <div className="category-item">
                  <div className="category-image">
                    <img src={require('../../assets/images/plant1.jpg')} alt="Plant Care" />
                  </div>
                  <p className="category-label">Plant Care</p>
                </div>
                <div className="category-item">
                  <div className="category-image">
                    <img src={require('../../assets/images/plant1.jpg')} alt="Seeds" />
                  </div>
                  <p className="category-label">Seeds</p>
                </div>
              </div>
              <button className="scroll-button right" onClick={() => document.querySelector('.category-scroll').scrollBy(200, 0)}>
                &gt;
              </button>
            </div>
          </section>

          {/* Featured Products Section - Now Second */}
          <h2 className="featured-section__title">Featured Products</h2>
          <div className="featured-container">
            <button className="scroll-button left" onClick={() => document.querySelector('.featured-scroll').scrollBy(-200, 0)}>
              &lt;
            </button>
            <div className="featured-scroll">
              <div className="featured-item">
                <div className="featured-image">
                  <img src={require('../../assets/images/plant1.jpg')} alt="Indoor Plants" />
                </div>
                <p className="featured-label">Indoor Plants</p>
              </div>
              <div className="featured-item">
                <div className="featured-image">
                  <img src={require('../../assets/images/plant1.jpg')} alt="Outdoor Plants" />
                </div>
                <p className="featured-label">Outdoor Plants</p>
              </div>
              <div className="featured-item">
                <div className="featured-image">
                  <img src={require('../../assets/images/plant1.jpg')} alt="Gardening Tools" />
                </div>
                <p className="featured-label">Gardening Tools</p>
              </div>
              <div className="featured-item">
                <div className="featured-image">
                  <img src={require('../../assets/images/plant1.jpg')} alt="Plant Care" />
                </div>
                <p className="featured-label">Plant Care</p>
              </div>
              <div className="featured-item">
                <div className="featured-image">
                  <img src={require('../../assets/images/plant1.jpg')} alt="Seeds" />
                </div>
                <p className="featured-label">Seeds</p>
              </div>
            </div>
            <button className="scroll-button right" onClick={() => document.querySelector('.featured-scroll').scrollBy(200, 0)}>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
