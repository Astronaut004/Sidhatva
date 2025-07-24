import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div>
            <a href="#" className="text-2xl font-bold text-gray-800">SIDHATVA</a>
          </div>

          {/* Primary Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="py-2 px-3 text-gray-700 hover:text-gray-900 font-medium">Home</a>
            <a href="#" className="py-2 px-3 text-gray-700 hover:text-gray-900 font-medium">Furniture</a>
            <a href="#" className="py-2 px-3 text-gray-700 hover:text-gray-900 font-medium">Storage & Organization</a>
            <a href="#" className="py-2 px-3 text-gray-700 hover:text-gray-900 font-medium">Sofas</a>
            <a href="#" className="py-2 px-3 text-gray-700 hover:text-gray-900 font-medium">Office Furniture</a>
            <a href="#" className="py-2 px-3 text-gray-700 hover:text-gray-900 font-medium">About Us</a>
            <a href="#" className="py-2 px-3 text-gray-700 hover:text-gray-900 font-medium">Contact</a>
          </div>

          {/* Secondary Nav (e.g., Cart/Login) */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="py-2 px-3 text-gray-700 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.703.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </a>
            <a href="#" className="py-2 px-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300">Sign In</a>
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu hidden md:hidden">
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Furniture</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Interior Design</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">About Us</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Contact</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Sign In</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
