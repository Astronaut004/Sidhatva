import React, { useState } from 'react';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';

const Card = ({ item }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative">
        <img
          src={item.image}
          alt={item.img_attribute}
          className="w-full h-64 object-cover"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
          <FiHeart className="h-5 w-5 text-gray-600" />
        </button>
        <div className="absolute bottom-3 left-3 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded">
          {item.img_head}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate" title={item.heading}>{item.heading}</h3>
          {item.tag && <span className="bg-sky-100 text-sky-600 text-xs px-2 py-1 rounded flex-shrink-0 ml-2">{item.tag}</span>}
        </div>
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <FiStar className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-900">{item.rating}</span>
            <span className="mx-1 text-gray-500">•</span>
            <span className="text-sm text-gray-500">{item.review_count} reviews</span>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
          {item.Ac_price && (
            <span className="ml-2 text-sm text-gray-500 line-through">₹{item.Ac_price}</span>
          )}
        </div>

        <div className="flex-grow">
          <p className={`text-gray-600 mb-4 ${!showFullDescription ? 'line-clamp-2' : ''}`}>
            {item.desc}
          </p>
          {item.desc.length > 100 && (
            <button onClick={() => setShowFullDescription(!showFullDescription)} className="text-sm text-sky-500 hover:underline">
              {showFullDescription ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>

        <div className="mt-auto pt-4">
          <button className="w-full bg-white border border-sky-400 text-sky-500 py-2 rounded-lg hover:bg-sky-50 transition flex justify-center items-center gap-2">
            <FiShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
