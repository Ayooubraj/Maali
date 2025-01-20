import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';

const ProductPage = () => {
  // Define the products array inside the component
  const products = [
    {
      id: 1,
      name: 'Indoor Plant - Fern',
      price: '25.00',
      rating: '4.5',
      image: require('../../assets/images/plant1.jpg'),
    },
    {
      id: 2,
      name: 'Outdoor Plant - Bamboo',
      price: '45.00',
      rating: '4.7',
      image: require('../../assets/images/plant1.jpg'),    },
    {
      id: 3,
      name: 'Cactus Plant',
      price: '15.00',
      rating: '4.3',
      image: require('../../assets/images/plant1.jpg'),    },
    // Add more products as needed
  ];

  return (
    <div className="product-page">
      {/* Hero Section */}
      <div className="product-page__hero">
        <div className="hero__overlay">
          <div className="hero__search-bar">
            <input
              className="search-bar__input"
              type="text"
              placeholder="Search for plants..."
            />
            <span className="search-bar__icon">
              <i className="fa fa-search"></i>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content: Filter Panel and Product Cards */}
      <div className="main-content">
        <div className="filter-panel">
          {/* Filter Panel Content (you can add filters here) */}
          <h3 className="filter-panel__header">Filters</h3>
          {/* Other filter categories can be added here */}
        </div>

        <div className="product-cards-container">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
