import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-left">
          <h1>Welcome to Maali</h1>
          <p className="tagline">Your One-Stop Gardening Solution</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🌱</span>
              <p>Expert Gardening Services</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏡</span>
              <p>Professional Home Services</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌿</span>
              <p>Quality Garden Products</p>
            </div>
          </div>
        </div>
        
        <div className="auth-card">
          <div className="auth-logo">
            <img 
              src={require('../../../assets/images/logo2.png')} 
              alt="Logo" 
              loading="lazy"
            />
          </div>
          <h2>Welcome Back!</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
          <p className="auth-switch">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
