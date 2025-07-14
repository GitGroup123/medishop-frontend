import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; 
import Products from './pages/Products';
import Categories from './pages/Categories';
import Footer from './components/Footer';
import CategoryProducts from './pages/CategoryProducts';
import ProductDetails from './pages/ProductDetails';




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />

      </Routes>
            <Footer />
    </Router>
  );
}

export default App;
