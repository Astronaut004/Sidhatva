import React, { useState } from 'react';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';

const Card = ({ item }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

let tagClasses = "text-xs px-2 py-1 rounded flex-shrink-0 ml-2";

if (!item.tag) {
  tagClasses += " hidden";
} else if (item.tag.includes('%') || item.tag.startsWith('-')) {
  tagClasses += " bg-red-100 text-red-600";
} else if (item.tag === "new") {
  tagClasses += " bg-sky-100 text-sky-600";
} else if (item.tag === "bestseller") {
  tagClasses += " bg-violet-100 text-violet-600";
} else {
  tagClasses += " bg-gray-100 text-gray-600";
}


  return (
    <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative">
        <img
          src={item.image}
          alt={item.img_attribute}
          className="w-full h-64 object-cover" />
        <div className="cursor-pointer absolute top-3 right-3 bg-white rounded-full p-2 shadow">
          <FiHeart className="h-5 w-5 text-gray-400 hover:text-red-500" />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate" title={item.heading}>{item.heading}</h3>
          {item.tag && <span className={tagClasses}>{item.tag}</span>}
        </div>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="h-4 w-4" />
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-1">({item.review_count} reviews)</span>
        </div>

        <div className="mt-3 flex-grow">
          <p className={`text-gray-600 text-sm ${!showFullDescription ? 'line-clamp-2' : ''}`}>
            {item.desc}
          </p>
          {item.desc.length > 100 && (
            <button onClick={() => setShowFullDescription(!showFullDescription)} className="text-sm text-sky-500 hover:underline mt-1">
              {showFullDescription ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>

        <div className="mt-4">
          <p className="text-xl font-bold text-sky-600">
            ₹{item.price} <span className="text-gray-400 line-through text-sm ml-1">₹{item.Ac_price}</span>
          </p>
        </div>

        <div className="mt-4">
          <button className="cursor-pointer w-full bg-white border border-sky-400 text-sky-500 py-2 rounded-lg hover:bg-sky-50 transition flex justify-center items-center gap-2">
            <FiShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
