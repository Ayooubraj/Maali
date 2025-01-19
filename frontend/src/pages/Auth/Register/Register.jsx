import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Register attempt:', formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-left">
          <h1>Join Maali Today</h1>
          <p className="tagline">Start Your Gardening Journey</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🌱</span>
              <p>Access Premium Services</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏡</span>
              <p>Book Expert Gardeners</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌿</span>
              <p>Exclusive Member Benefits</p>
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
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
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
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="auth-button">
              Sign Up
            </button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
