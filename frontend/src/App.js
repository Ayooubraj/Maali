// src/App.js
import React from 'react';
import './App.css'; // You can add some global styles here if needed
import Navigation from './components/Navbar/Navigation'; // Importing the Navbar
import HomePage from './pages/home/HomePage'; // Importing the HomePage

const App = () => {
  return (
    <div className="App">
      {/* Render Navbar */}
      <Navigation />

      {/* Render HomePage */}
      <HomePage />
    </div>
  );
};

export default App;
