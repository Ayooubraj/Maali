import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext); // Use CartContext

  const [selectedPayment, setSelectedPayment] = useState('cod'); // Default to COD

  const updateQuantity = (itemId, change) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + change);
          return {
            ...item,
            quantity: newQuantity
          };
        }
        return item;
      }).filter(item => item.quantity > 0) // Remove items with quantity 0
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Check if item.price is defined
      return total + (item.price ? item.price * item.quantity : 0);
    }, 0);
  };

  const handleCheckout = () => {
    const confirmation = window.confirm("Are you sure you want to make a purchase?");
    if (confirmation) {
      if (selectedPayment === 'khalti') {
        // Implement Khalti payment logic here
        console.log('Processing Khalti payment...');
      } else {
        // Implement COD logic here
        console.log('Processing Cash on Delivery...');
      }
    }
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => window.location.href = '/products'}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">₨ {item.price ? item.price.toFixed(2) : 'N/A'}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <p className="item-total">
                  ₨ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-details">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₨ {calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₨ {calculateTotal().toFixed(2)}</span>
              </div>

              {/* Payment Options */}
              <div className="payment-options">
                <h3>Payment Method</h3>
                <div className="payment-methods">
                  <div 
                    className={`payment-method ${selectedPayment === 'khalti' ? 'selected' : ''}`}
                    onClick={() => setSelectedPayment('khalti')}
                  >
                    <img 
                      src={require('../../assets/images/khalti_logo.png')} 
                      alt="Khalti" 
                      className="payment-logo"
                    />
                    <span>Khalti</span>
                  </div>
                  <div 
                    className={`payment-method ${selectedPayment === 'cod' ? 'selected' : ''}`}
                    onClick={() => setSelectedPayment('cod')}
                  >
                    <img 
                      src={require('../../assets/images/COD.png')} 
                      alt="COD" 
                      className="payment-logo"
                    />
                    <span>Cash on Delivery</span>
                  </div>
                </div>
              </div>

              <button 
                className="checkout-button"
                onClick={handleCheckout}
              >
                {selectedPayment === 'khalti' ? 'Pay with Khalti' : 'Place Order (COD)'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
