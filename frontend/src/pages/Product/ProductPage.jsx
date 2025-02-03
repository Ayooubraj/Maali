import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterPanel from '../../components/Filter/FilterPanel';
import './ProductPage.css';
import { useCart } from '../../context/CartContext';

const ProductPage = () => {
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const navigate = useNavigate(); // Initialize useNavigate
  const { addToCart } = useCart(); // Use the hook at the top level

  const getRandomPrice = () => {
    return Math.floor(Math.random() * (900 - 200 + 1)) + 200; // Random price between 200 and 900
  };

  // Sample products data
  const products = [
    { id: 1, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg'),price:500 },
    { id: 2, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant2.png'),price:400 }, 
    { id: 3, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg'), price:520 },
    { id: 4, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant2.png'), price:800 },
    { id: 5, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg'),price:100 },
    { id: 6, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant2.png'), price:300 },


    { id: 7, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, price: getRandomPrice(), image: require('../../assets/images/outdoor_img.jpg') },
    { id: 8, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, price: getRandomPrice(), image: require('../../assets/images/outdoor_img.jpg') },
    { id: 9, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, price: getRandomPrice(), image: require('../../assets/images/outdoor_img.jpg') },
    { id: 10, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, price: getRandomPrice(), image: require('../../assets/images/outdoor_img.jpg') },
    { id: 11, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, price: getRandomPrice(), image: require('../../assets/images/outdoor_img.jpg') },
    { id: 12, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, price: getRandomPrice(), image: require('../../assets/images/outdoor_img.jpg') },

    { id: 13, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img.png') },
    { id: 14, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img.png') },
    { id: 15, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img.png') },
    { id: 16, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img.png') },
    { id: 17, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img.png') },
    { id: 18, name: "Garden Tools", category: "Tools", rating: 4.8, price: getRandomPrice(), image: require('../../assets/images/tool_img.png') },

    { id: 19, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },
    { id: 20, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },
    { id: 21, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },
    { id: 22, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },
    { id: 23, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },
    { id: 24, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },
    { id: 25, name: "Pots", category: "Pots", rating: 4.2, price: getRandomPrice(), image: require('../../assets/images/pot_img.jpeg') },


    { id: 26, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/seed_img.png') },
    { id: 27, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/seed_img.png') },
    { id: 28, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/seed_img.png') },
    { id: 29, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/seed_img.png') },
    { id: 30, name: "Fertilizers", category: "Fertilizers", rating: 4.6, price: getRandomPrice(), image: require('../../assets/images/seed_img.png') },

    // Add more products as needed
  ];

  const sections = [
    { title: "Indoor Plants", products: products.filter(p => p.category === "Indoor") },
    { title: "Outdoor Plants", products: products.filter(p => p.category === "Outdoor") },
    { title: "Tools and Equipments", products: products.filter(p => p.category === "Tools") },
    { title: "Pots and Supplies", products: products.filter(p => p.category === "Pots") },
    { title: "Seeds and Fertilizers", products: products.filter(p => p.category === "Fertilizers") },
  ];

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.querySelector(`.product-section${hash}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const ProductCard = ({ product, handleBuyNow }) => (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ₨ {product.price.toFixed(2)}</p>
      <p className="product-rating">Rating: {product.rating} ★</p>
      <div className="button-container">
        <button className="buy-now-button" onClick={() => handleBuyNow(product)}>Buy Now</button>
      </div>
    </div>
  );

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
            <div key={section.title} className={`product-section ${section.title.replace(/\s+/g, '-').toLowerCase()}`} id={section.title.toLowerCase().replace(/\s+/g, '-')}>
              <h2>{section.title}</h2>
              <div className="product-cards-container">
                <button className="scroll-button left" onClick={() => document.querySelector(`.${section.title.replace(/\s+/g, '-').toLowerCase()} .product-cards-wrapper`).scrollBy(-200, 0)}>❮</button>
                <div className="product-cards-wrapper">
                  {section.products.map(product => (
                    <ProductCard key={product.id} product={product} handleBuyNow={handleBuyNow} />
                  ))}
                </div>
                <button className="scroll-button right" onClick={() => document.querySelector(`.${section.title.replace(/\s+/g, '-').toLowerCase()} .product-cards-wrapper`).scrollBy(200, 0)}>❯</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
