// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import placeholder from '../assets/placeholder.png';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        if (res.data.image) {
          setSelectedImage(res.data.image);
        } else if (res.data.gallery && res.data.gallery.length > 0) {
          setSelectedImage(res.data.gallery[0]);
        }
      })
      .catch((err) => console.error('Error fetching product:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    if (variant.image) {
      setSelectedImage(variant.image);
    }
  };

  if (loading) return <div className="pt-24 px-6 text-center">Loading...</div>;
  if (!product) return <div className="pt-24 px-6 text-center">Product not found</div>;

  const getImagePath = () => {
    if (selectedVariant?.image) {
      return `http://localhost:8080/uploads/products/variations/${selectedVariant.image}`;
    } else if (selectedImage) {
      const allImages = [product.image, ...(product.gallery || [])];
      const existsInGallery = product.gallery?.includes(selectedImage);
      const pathFolder = existsInGallery ? 'gallery' : 'main';
      return `http://localhost:8080/uploads/products/${pathFolder}/${selectedImage}`;
    } else if (product.gallery && product.gallery.length > 0) {
      return `http://localhost:8080/uploads/products/gallery/${product.gallery[0]}`;
    } else {
      return placeholder;
    }
  };

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left: Images */}
        <div className="flex-1">
          <div className="border rounded-lg overflow-hidden shadow mb-4">
            <img
              src={getImagePath()}
              alt={product.name}
              onError={(e) => (e.target.src = placeholder)}
              className="w-full h-[400px] object-contain bg-white"
            />
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex gap-3 flex-wrap justify-start">
            {[...(product.image ? [product.image] : []), ...(product.gallery || [])].map((img, i) => (
              <img
                key={i}
                src={`http://localhost:8080/uploads/products/${product.gallery?.includes(img) ? 'gallery' : 'main'}/${img}`}
                alt="gallery"
                onClick={() => setSelectedImage(img)}
                onError={(e) => (e.target.src = placeholder)}
                className={`h-20 w-20 object-contain border cursor-pointer rounded-md p-1 ${selectedImage === img ? 'ring-2 ring-blue-500' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">{product.name}</h2>
          <p className="text-gray-700 mb-4 text-sm">{product.shortDesc || 'No description provided.'}</p>

          <div className="text-2xl font-bold text-green-600 mb-1">
            ₹{selectedVariant?.salePrice || selectedVariant?.price || product.salePrice || product.price}
          </div>
          {product.salePrice && !selectedVariant && (
            <div className="text-gray-500 line-through mb-4">₹{product.price}</div>
          )}

          {/* Attribute selector */}
          {product.variations?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-sm">Select Variant:</h4>
              <div className="flex flex-wrap gap-2">
                {product.variations.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => handleVariantSelect(v)}
                    className={`border rounded px-3 py-1 text-sm ${selectedVariant === v ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-50'}`}
                  >
                    {Object.entries(v.attributes).map(([k, val]) => `${val}`).join(', ')}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="mt-4 px-6 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
