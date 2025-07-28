import React, { useState } from 'react';
import { cart as sampleWishlist } from '../Data/data';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(sampleWishlist);

  const handleRemove = (indexToRemove) => {
    const updated = wishlist.filter((_, index) => index !== indexToRemove);
    setWishlist(updated);
  };

  const handleAddToCart = (item) => {
    console.log('Added to cart:', item.heading); // Simulate
    alert(`Added "${item.heading}" to cart`);
    // You can push it to a global cart state or localStorage if needed
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-6">
          {wishlist.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 p-4 bg-white shadow-md rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.heading}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-medium">{item.heading}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                  <p className="mt-1 text-sky-600 font-semibold">
                    ₹{item.Ac_price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="cursor-pointer bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(index)}
                  className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
