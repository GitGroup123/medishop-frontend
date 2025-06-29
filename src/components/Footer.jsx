// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">MedShop</h3>
          <p>Your one-stop health & wellness partner.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul>
            <li><a href="" className="hover:underline">Home</a></li>
            <li><a href="categories" className="hover:underline">Categories</a></li>
            <li><a href="about" className="hover:underline">About</a></li>
            <li><a href="contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p>Email: support@medshop.com</p>
          <p>Phone: +91 9876543210</p>
        </div>
      </div>
      <div className="text-center py-4 border-t border-blue-700 text-sm">
        &copy; {new Date().getFullYear()} MedShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
