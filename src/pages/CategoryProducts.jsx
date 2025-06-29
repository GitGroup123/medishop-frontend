// src/pages/CategoryProducts.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import placeholder from '../assets/placeholder.png';

const CategoryProducts = () => {
  const { id } = useParams();
  const location = useLocation();
  const categoryName = location.state?.name || 'Category';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://medishop-backend-rqfh.onrender.com/api/allproducts/${id}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6 tracking-tight">
          Products in "{categoryName}"
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-lg">No products found for this category.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl border shadow-sm hover:shadow-xl transition duration-300 p-5 flex flex-col items-center justify-center h-full group hover:scale-105 transform"
              >
                <div className="w-full h-[160px] flex items-center justify-center overflow-hidden mb-4">
                  <img
                    src={`https://medishop-backend-rqfh.onrender.com/uploads/products/main/${product.image}`}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholder;
                    }}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-200"
                  />
                </div>
                <h3 className="text-lg font-semibold text-blue-800 group-hover:text-blue-600 mb-1">
                  {product.name}
                </h3>
                <p className="text-green-700 font-bold text-md">₹{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
