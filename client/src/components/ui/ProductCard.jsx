import React from 'react';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const { name, category, rating, reviews, price, originalPrice, image, description } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out group">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FiHeart className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-lg font-semibold text-white truncate">{name}</h3>
          <p className="text-sm text-gray-300">{category}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FiStar className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-800">{rating}</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-sm text-gray-600">{reviews} reviews</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            <span className="text-gray-500 line-through text-sm font-normal mr-2">₹{originalPrice.toLocaleString()}</span>
            ₹{price.toLocaleString()}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">{description}</p>
        <div className="flex items-center justify-between">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300">
            Add to Cart
          </button>
          <button className="ml-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FiShoppingCart className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
