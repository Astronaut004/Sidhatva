import React from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between h-16 px-6 font-sans text-sm text-gray-800">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-[#B3ECFF] text-xl font-semibold">Sidhatva</span>
          <span className="text-yellow-400 text-lg">✨</span>
        </div>

        {/* Center Links */}
        <div className="flex space-x-6 font-medium">
          <a href="#" className="hover:text-blue-500">Home</a>
          <a href="#" className="hover:text-blue-500">Furniture</a>
          <a href="#" className="hover:text-blue-500">Sofas</a>
          <a href="#" className="hover:text-blue-500">About</a>
          <a href="#" className="hover:text-blue-500">Contact</a>
        </div>

        {/* Search Box */}
        <div className="flex items-center flex-1 max-w-lg mx-6">
          <div className="flex items-center bg-[#f9fcfd] border border-[#e8f7fb] rounded-md px-3 py-2 w-full">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for furniture, décor, and more..."
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <FiHeart className="text-xl" />
          <div className="relative">
            <FiShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-[#B3ECFF] text-xs text-black w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </div>
          <button className="flex items-center bg-[#f9fcfd] border border-[#e8f7fb] px-3 py-1.5 rounded-md">
            <FiUser className="mr-1" />
            <span className="text-sm font-medium">Sign In</span>
          </button>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-t border-gray-200" />
    </div>
  );
};

export default Navbar;
