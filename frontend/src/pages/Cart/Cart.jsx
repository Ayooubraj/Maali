import React, { useContext, useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Cart.css';
import KhaltiCheckout from 'khalti-checkout-web';

const Cart = () => {
  const { cart } = useCart();

  const [selectedPayment, setSelectedPayment] = useState('cod'); // Default to COD

  const khaltiConfig = {
    publicKey: "YOUR_KHALTI_PUBLIC_KEY",
    productIdentity: "1234567890",
    productName: "Product Name",
    productUrl: "http://example.com/product",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verification
        console.log(payload);
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  const updateQuantity = (itemId, change) => {
    // Implementation of updateQuantity function
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price ? item.price : 0);
    }, 0);
  };

  const handleCheckout = () => {
    const confirmation = window.confirm("Are you sure you want to make a purchase?");
    if (confirmation) {
      if (selectedPayment === 'khalti') {
        // Implement Khalti payment logic here
        handleKhaltiPayment();
      } else {
        // Implement COD logic here
        console.log('Processing Cash on Delivery...');
      }
    }
  };

  const handleKhaltiPayment = () => {
    const checkout = new KhaltiCheckout(khaltiConfig);
    checkout.show({ amount: 1000 }); // Amount in paisa
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => window.location.href = '/products'}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.alt} className="item-image" />
                <div className="item-details">
                  <h3>{item.label}</h3>
                  <p className="item-price">₨ {item.price.toFixed(2)}</p>
                </div>
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
