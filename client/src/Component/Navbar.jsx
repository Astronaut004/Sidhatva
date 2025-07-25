import React from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between h-20 px-8 font-sans text-base text-gray-800">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-sky-400 text-2xl font-semibold">Sidhatva</span>
          <span className="text-yellow-400 text-xl">✨</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8 font-medium">
          <a href="#" className="hover:text-blue-500">Home</a>
          <a href="#" className="hover:text-blue-500">Furniture</a>
          <a href="#" className="hover:text-blue-500">Sofas</a>
          <a href="#" className="hover:text-blue-500">About</a>
          <a href="#" className="hover:text-blue-500">Contact</a>
        </div>

        {/* Search */}
        <div className="flex items-center flex-1 max-w-lg mx-8">
          <div className="flex items-center bg-[#f9fcfd] border border-[#e8f7fb] rounded-md px-3 py-2 w-full focus-within:ring-2 focus-within:ring-sky-400 focus-within:border-sky-400">
            <FiSearch className="text-gray-500 mr-2 text-lg" />
            <input
              type="text"
              placeholder="Search for furniture, décor, and more..."
              className="w-full bg-transparent outline-none text-base text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>


        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-full cursor-pointer hover:bg-[#e8f7fb] transition">
            <FiHeart className="text-2xl" />
          </div>

          <div className="relative p-2 rounded-full cursor-pointer hover:bg-[#e8f7fb] transition">
            <FiShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-sky-400 text-xs text-black w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </div>

          <button className="flex items-center bg-[#f9fcfd] border border-[#e8f7fb] px-3 py-1.5 rounded-md hover:bg-[#e8f7fb] cursor-pointer transition">
            <FiUser className="mr-1 text-lg" />
            <span className="text-base font-medium">Sign In</span>
          </button>
        </div>
      </div>

      {/* Bottom Divider */}
      <hr className="border-t border-gray-200" />
    </div>
  );
};

export default Navbar;
