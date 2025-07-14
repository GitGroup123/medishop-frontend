import React, { useEffect, useState } from 'react';
import axios from 'axios';
import placeholder from '../assets/placeholder.png'; // Make sure image exists

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://medishop-backend-rqfh.onrender.com/api/products') // Replace with your actual endpoint
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []);

  // Filter based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 px-6 bg-white text-center">
      <h2 className="text-4xl font-bold text-blue-900 mb-6">Products</h2>

      {/* Search Box */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600 text-lg">No products found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl shadow hover:shadow-lg transition p-4 bg-white flex flex-col items-center"
            >
              <img
                src={`https://medishop-backend-rqfh.onrender.com/uploads/products/main/${product.image}`}
                alt={product.name}
                className="h-40 w-auto object-contain mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholder;
                }}
              />
              <h3 className="text-lg font-bold bg-blue-900 text-white px-4 py-2 rounded">
                {product.name}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
