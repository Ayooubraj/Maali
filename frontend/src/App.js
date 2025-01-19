// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navbar/Navigation';
import HomePage from './pages/home/HomePage';
import ProductPage from './pages/Product/ProductPage';
import HomeServicePage from './pages/HomeService/HomeServicePage';
import FilterPanel from './components/Filter/FilterPanel';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Render Navbar */}
        <Navigation />

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/homeservice" element={<HomeServicePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
