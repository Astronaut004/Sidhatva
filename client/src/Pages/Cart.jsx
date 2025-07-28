import React, { useState } from 'react';
import CartCard from '../Component/CartCard';
import { cart as initialCart } from '../Data/data';

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  const handleRemove = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
  };

  // 🧮 Cart summary values
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-6 mb-6">
            {cartItems.map((item, index) => (
              <CartCard key={index} item={item} onRemove={() => handleRemove(index)} />
            ))}
          </div>

          {/* 🧾 Cart Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-2">Cart Summary</h3>
            <p className="text-gray-700">Total Items: {totalItems}</p>
            <p className="text-gray-700">Total Price: ₹{totalPrice.toLocaleString()}</p>
            <button
              className="mt-4 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
              onClick={() => alert('Proceeding to checkout...')}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
