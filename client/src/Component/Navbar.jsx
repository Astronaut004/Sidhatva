import React, { useState } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex flex-wrap items-center justify-between h-auto min-h-20">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Mobile Menu Button - visible on small screens */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <Link 
              to='/'
              className="flex items-center space-x-2">
              <span className="text-sky-400 text-2xl font-semibold">Sidhatva</span>
              <span className="text-yellow-400 text-xl">✨</span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex flex-wrap gap-4 xl:gap-6 font-medium">
            <Link to='/' >Home</Link>
            <Link to='/furniture' >Furniture</Link>
            <Link to='/Electronics' >Glow & Power</Link>
            <Link to='/decor' >Luxury Decor</Link>
            <Link to='/About' >About</Link>
            <Link to='/Contact' >Contact</Link>
            <Link to='/productCategory' >category</Link>
            <Link to='/productCreation' >product creation</Link>
          </div>

          {/* Search - Desktop */}
          <div className="hidden xl:flex items-center flex-1 min-w-0 max-w-lg mx-4">
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
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Button */}
            {/* <button
              className="lg:hidden p-2 rounded-full hover:bg-[#e8f7fb] transition"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <FiSearch className="text-xl sm:text-2xl" />
            </button> */}

            <Link
              to='/wishlist'
              className="hidden sm:block p-2 rounded-full cursor-pointer hover:bg-[#e8f7fb] transition">
              <FiHeart className="text-xl sm:text-2xl" />
            </Link>

            <Link to='/cart' className="relative p-2 rounded-full cursor-pointer hover:bg-[#e8f7fb] transition">
              <FiShoppingCart className="text-xl sm:text-2xl" />
              <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-sky-400 text-xs text-black w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            <button className="hidden sm:flex items-center bg-[#f9fcfd] border border-[#e8f7fb] px-3 py-1.5 rounded-md hover:bg-[#e8f7fb] cursor-pointer transition">
              <FiUser className="mr-1 text-lg" />
              <Link to='login' className="text-base font-medium">Sign In</Link>
            </button>
          </div>
        </div>

        {/* Mobile Search - appears when search button clicked */}
        {/* {isSearchOpen && (
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
        )} */}

        {/* Mobile Menu - appears when menu button clicked */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="flex flex-col px-4 py-3 space-y-4">
              <Link to='/' onClick={(e) => { setIsMenuOpen(false) }} className="py-2 hover:text-blue-500 transition" >Home</Link>
              <Link to='/furniture' onClick={(e) => { setIsMenuOpen(false) }} className="py-2 hover:text-blue-500 transition" >Furniture</Link>
              <Link to='/Electronics' onClick={(e) => { setIsMenuOpen(false) }} className="py-2 hover:text-blue-500 transition" >Glow & Power</Link>
              <Link to='/decor' onClick={(e) => { setIsMenuOpen(false) }} className="py-2 hover:text-blue-500 transition" >Luxury Decor</Link>
              <Link to='/About' onClick={(e) => { setIsMenuOpen(false) }} className="py-2 hover:text-blue-500 transition" >About</Link>
              <Link to='/Contact' onClick={(e) => { setIsMenuOpen(false) }} className="py-2 hover:text-blue-500 transition" >Contact</Link>
              <div className="flex items-center bg-[#f9fcfd] border border-[#e8f7fb] rounded-md px-3 py-2 w-full mb-4 focus-within:ring-2 focus-within:ring-sky-400 focus-within:border-sky-400">
                <FiSearch className="text-gray-500 mr-2 text-lg" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent outline-none text-base text-gray-700 placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center pt-2 space-x-4">
                <button className="flex items-center bg-[#f9fcfd] border border-[#e8f7fb] px-3 py-1.5 rounded-md hover:bg-[#e8f7fb] cursor-pointer transition">
                  <FiUser className="mr-1 text-lg" />
                  <Link to='login' className="text-base font-medium">Sign In</Link>
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