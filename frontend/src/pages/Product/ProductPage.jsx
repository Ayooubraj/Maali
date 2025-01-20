import React, { useRef } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterPanel from '../../components/Filter/FilterPanel';
import './ProductPage.css';

const ProductPage = () => {
  // Sample products data
  const products = [
    { id: 1, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg') },
    { id: 2, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg') },
    { id: 3, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg') },
    { id: 4, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg') },
    { id: 5, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg') },
    { id: 6, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg') },


    { id: 7, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, image: require('../../assets/images/outdoor_img.jpg') },
    { id: 8, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, image: require('../../assets/images/outdoor_img.jpg') },
    { id: 9, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, image: require('../../assets/images/outdoor_img.jpg') },
    { id: 10, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, image: require('../../assets/images/outdoor_img.jpg') },
    { id: 11, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, image: require('../../assets/images/outdoor_img.jpg') },
    { id: 12, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, image: require('../../assets/images/outdoor_img.jpg') },

    { id: 13, name: "Garden Tools", category: "Tools", rating: 4.8, image: require('../../assets/images/tool_img.png') },
    { id: 14, name: "Garden Tools", category: "Tools", rating: 4.8, image: require('../../assets/images/tool_img.png') },
    { id: 15, name: "Garden Tools", category: "Tools", rating: 4.8, image: require('../../assets/images/tool_img.png') },
    { id: 16, name: "Garden Tools", category: "Tools", rating: 4.8, image: require('../../assets/images/tool_img.png') },
    { id: 17, name: "Garden Tools", category: "Tools", rating: 4.8, image: require('../../assets/images/tool_img.png') },
    { id: 18, name: "Garden Tools", category: "Tools", rating: 4.8, image: require('../../assets/images/tool_img.png') },

    { id: 19, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },
    { id: 20, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },
    { id: 21, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },
    { id: 22, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },
    { id: 23, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },
    { id: 24, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },
    { id: 25, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },


    { id: 26, name: "Fertilizers", category: "Fertilizers", rating: 4.6, image: require('../../assets/images/seed_img.png') },
    { id: 27, name: "Fertilizers", category: "Fertilizers", rating: 4.6, image: require('../../assets/images/seed_img.png') },
    { id: 28, name: "Fertilizers", category: "Fertilizers", rating: 4.6, image: require('../../assets/images/seed_img.png') },
    { id: 29, name: "Fertilizers", category: "Fertilizers", rating: 4.6, image: require('../../assets/images/seed_img.png') },
    { id: 30, name: "Fertilizers", category: "Fertilizers", rating: 4.6, image: require('../../assets/images/seed_img.png') },

    // Add more products as needed
  ];

  const sections = [
    { title: "Indoor Plants", products: products.filter(p => p.category === "Indoor") },
    { title: "Outdoor Plants", products: products.filter(p => p.category === "Outdoor") },
    { title: "Tools and Equipments", products: products.filter(p => p.category === "Tools") },
    { title: "Pots and Supplies", products: products.filter(p => p.category === "Pots") },
    { title: "Seeds and Fertilizers", products: products.filter(p => p.category === "Fertilizers") },
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

        {/* Product Sections */}
        <div className="products-section">
          {sections.map(section => (
            <div key={section.title} className="product-section">
              <h2>{section.title}</h2>
              <div className="product-cards-container">
                <button className="scroll-button left" onClick={() => scroll(section.title, -1)}>❮</button>
                <div className="product-cards-wrapper">
                  {section.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <button className="scroll-button right" onClick={() => scroll(section.title, 1)}>❯</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const scroll = (sectionTitle, direction) => {
  const container = document.querySelector(`.product-section[data-title="${sectionTitle}"] .product-cards-wrapper`);
  const scrollAmount = direction === 1 ? container.scrollWidth / 3 : -container.scrollWidth / 3;
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};

export default ProductPage;
