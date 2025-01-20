import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterPanel from '../../components/Filter/FilterPanel';
import './ProductPage.css';

const ProductPage = () => {
  // Define the products array inside the component
  const products = [

  ];

  return (
    <div className="productpage">
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
            <h2 className="hero__description">Find the Perfect Plants for Your Garden!</h2>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Filter Panel */}
        <div className="filter-container">
          <FilterPanel />
        </div>

        {/* Right Side Content - We'll add product grid here later */}
        <div className="products-section">
          <div className="product-cards-container">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
