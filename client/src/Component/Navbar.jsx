import React, { useState } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { Link } from 'react-router-dom';
  

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-20">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Mobile Menu Button - visible on small screens */}
            <button 
              className="md:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sky-400 text-2xl font-semibold">Sidhatva</span>
              <span className="text-yellow-400 text-xl">✨</span>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 font-medium">
            <Link to='/' >Home</Link>
            <Link to='/furniture' >Furniture</Link>
            <Link to='/Sofa' >Sofas</Link>
            <Link to='/About' >About</Link>
            <Link to='/Contact' >Contact</Link>
          </div>

          {/* Search - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-lg mx-8">
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
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Button */}
            <button 
              className="lg:hidden p-2 rounded-full hover:bg-[#e8f7fb] transition"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <FiSearch className="text-xl sm:text-2xl" />
            </button>

            <div className="hidden sm:block p-2 rounded-full cursor-pointer hover:bg-[#e8f7fb] transition">
              <FiHeart className="text-xl sm:text-2xl" />
            </div>

            <div className="relative p-2 rounded-full cursor-pointer hover:bg-[#e8f7fb] transition">
              <FiShoppingCart className="text-xl sm:text-2xl" />
              <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-sky-400 text-xs text-black w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </div>

            <button className="hidden sm:flex items-center bg-[#f9fcfd] border border-[#e8f7fb] px-3 py-1.5 rounded-md hover:bg-[#e8f7fb] cursor-pointer transition">
              <FiUser className="mr-1 text-lg" />
              <span className="text-base font-medium">Sign In</span>
            </button>
          </div>
        </div>

        {/* Mobile Search - appears when search button clicked */}
        {isSearchOpen && (
          <div className="lg:hidden px-4 py-3 bg-white border-t border-gray-200">
            <div className="flex items-center bg-[#f9fcfd] border border-[#e8f7fb] rounded-md px-3 py-2 w-full focus-within:ring-2 focus-within:ring-sky-400 focus-within:border-sky-400">
              <FiSearch className="text-gray-500 mr-2 text-lg" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-base text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu - appears when menu button clicked */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="flex flex-col px-4 py-3 space-y-4">
              <a href="#" className="py-2 hover:text-blue-500 transition">Home</a>
              <a href="#" className="py-2 hover:text-blue-500 transition">Furniture</a>
              <a href="#" className="py-2 hover:text-blue-500 transition">Sofas</a>
              <a href="#" className="py-2 hover:text-blue-500 transition">About</a>
              <a href="#" className="py-2 hover:text-blue-500 transition">Contact</a>
              <div className="flex items-center pt-2 space-x-4">
                {/* <FiHeart className="text-2xl" /> */}
                {/* <div className="relative">
                  <FiShoppingCart className="text-2xl" />
                  <span className="absolute -top-2 -right-2 bg-sky-400 text-xs text-black w-5 h-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                </div> */}
                <button className="flex items-center bg-[#f9fcfd] border border-[#e8f7fb] px-3 py-1.5 rounded-md hover:bg-[#e8f7fb] cursor-pointer transition">
                  <FiUser className="mr-1 text-lg" />
                  <span className="text-base font-medium">Sign In</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;