import React from 'react';

const CartCard = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.heading}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div>
          <h3 className="text-lg font-medium">{item.heading}</h3>
          <p className="text-sm text-gray-600">{item.desc}</p>
          <p className="mt-1 font-semibold text-sky-600">Price: ₹{item.price}</p>
        </div>
      </div>

      <button
        onClick={onRemove}
        className="cursor-pointer text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Remove
      </button>
    </div>
  );
};

export default CartCard;
