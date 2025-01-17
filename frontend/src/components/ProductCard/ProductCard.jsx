import React from 'react';
import './ProductCard.css'; // Make sure you link your CSS here

const ProductCard = ({ product }) => {
  return (
    <div className="featured-card">
      <div className="featured-card__image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="featured-card__details">
        <h3 className="featured-card__title">{product.name}</h3>
        <p className="featured-card__price">${product.price}</p>
        <p className="featured-card__rating">Rating: {product.rating}</p>
      </div>
      <div className="featured-card__buttons">
        <button className="featured-card__buy-button">Buy Now</button>
        <button className="featured-card__cart-button">
          <i className="fa fa-cart-plus"></i> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
