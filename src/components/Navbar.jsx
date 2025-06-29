// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
return (
  <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">MedShop</h1>
      <ul className="flex space-x-6 font-medium text-gray-700">
        <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
        <li><Link to="/categories" className="hover:text-blue-500">Categories</Link></li>
        <li><a href="#about" className="hover:text-blue-500">About Us</a></li>
        <li><a href="#contact" className="hover:text-blue-500">Contact Us</a></li>
      </ul>
    </div>
  </nav>
);
};

export default Navbar;
