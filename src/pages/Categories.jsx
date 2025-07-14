import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import placeholder from '../assets/placeholder.png';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-4 tracking-tight">
          Explore Our Categories
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Choose from a wide range of medical and health-related categories tailored for you.
        </p>

        {/* Search Box */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="🔍 Search categories..."
            className="w-full max-w-md mx-auto px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Grid of Categories */}
        {filteredCategories.length === 0 ? (
          <p className="text-gray-500 text-lg">No categories found for your search.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredCategories.map((category) => (
              <Link
                to={`/categories/${category._id}`}
                state={{ name: category.name }}
                key={category._id}
                className="group"
              >
                <div className="bg-white rounded-xl border shadow-sm hover:shadow-xl transition duration-300 p-5 flex flex-col items-center justify-center h-full group-hover:scale-105 transform">
                  <img
                    src={`http://localhost:8080${category.image}`}
                    alt={category.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholder;
                    }}
                    className="h-36 w-36 object-contain mb-4 transition duration-200 group-hover:scale-105"
                  />
                  <h3 className="text-lg font-semibold text-blue-800 group-hover:text-blue-600 transition">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
