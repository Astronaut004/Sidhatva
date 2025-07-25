import React, { useState } from 'react';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-sky-50 min-h-screen flex items-center justify-center px-6 py-12 font-sans">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left Section */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Transform Your <br />
              <span className="text-sky-500">Living Space</span>
            </h1>
            <p className="text-gray-600 mt-4 text-lg">
              Discover premium furniture and home décor that brings <br className="hidden md:block" />
              comfort, style, and personality to every corner of your home.
            </p>

            {/* Buttons Container */}
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
              {/* Dropdown */}
              <div className="relative inline-block text-left">
                {/* Toggle Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  🛒 Browse Categories ▾
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1 text-sm text-gray-700">
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">🛋️ All Categories</a>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">🪑 Sofas & Seating</a>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">🛏️ Beds & Mattresses</a>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">🍽️ Dining & Kitchen</a>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">💡 Lighting & Décor</a>
                    </div>
                  </div>
                )}
              </div>

              {/* Shop Now Button */}
              <button className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-md shadow hover:bg-sky-600 transition duration-300">
                Shop Now →
              </button>
            </div>

            {/* Quality Tag */}
            <div className="mt-4 text-sm text-sky-600 font-medium flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 bg-sky-500 rounded-full inline-block"></span>
              Premium Quality
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 relative">
            <img
              src="https://images.unsplash.com/photo-1635377316969-1c0e3c93c6d2?q=80&w=1000&auto=format&fit=crop"
              alt="Premium Sofa"
              className="rounded-xl shadow-lg w-full object-cover"
            />
            {/* Price Tag */}
            <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow px-4 py-3 text-center text-sm">
              <p className="text-gray-500">Starting from</p>
              <p className="text-sky-500 font-bold text-lg">₹29,999</p>
              <p className="text-gray-600">Premium Sofas</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-12">
  <h1 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h1>
  <p className="text-lg text-gray-600 max-w-xl mx-auto">
    Handpicked furniture pieces that combine style, comfort, and quality craftsmanship
  </p>
</div>

      {/* Top Deals Section */}
      <div className="bg-sky-50 py-12 px-4 sm:px-8 lg:px-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Top Deals for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Product 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <img src="https://images.unsplash.com/photo-1602288637782-6e1d008de1a4?q=80&w=800" alt="Modern Wooden Bed" className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Modern Wooden Bed</h3>
            <p className="text-sm text-gray-600 mt-1">
              <span className="text-yellow-500 font-medium">⭐ 4.8</span> (124 reviews)
            </p>
            <p className="text-xl font-bold text-sky-500 mt-2">
              ₹45,999 <span className="text-gray-400 line-through text-sm">₹52,999</span>
            </p>
            <p className="text-gray-600 mt-2">Elegant solid wood platform bed with built-in storage and minimalist design.</p>
            <button className="mt-4 w-full border border-sky-400 bg-white text-sky-500 py-2 rounded hover:bg-sky-100 flex justify-center items-center gap-2">
              🛒 Add to Cart
            </button>
          </div>

          {/* Product 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <img src="https://images.unsplash.com/photo-1582582494700-040e6f9f71a5?q=80&w=800" alt="Elegant Dining Set" className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Elegant Dining Set</h3>
            <p className="text-sm text-gray-600 mt-1">
              <span className="text-yellow-500 font-medium">⭐ 4.9</span> (89 reviews)
            </p>
            <p className="text-xl font-bold text-sky-500 mt-2">
              ₹89,999 <span className="text-gray-400 line-through text-sm">₹99,999</span>
            </p>
            <p className="text-gray-600 mt-2">Complete 6-seater dining set with solid wood table and upholstered chairs.</p>
            <button className="mt-4 w-full border border-sky-400 bg-white text-sky-500 py-2 rounded hover:bg-sky-100 flex justify-center items-center gap-2">
              🛒 Add to Cart
            </button>
          </div>

          {/* Product 3 */}
          <div className="bg-white rounded-lg shadow p-4">
            <img src="https://images.unsplash.com/photo-1601987077675-265cc5d0b7d1?q=80&w=800" alt="Home Décor Collection" className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Home Décor Collection</h3>
            <p className="text-sm text-gray-600 mt-1">
              <span className="text-yellow-500 font-medium">⭐ 4.7</span> (67 reviews)
            </p>
            <p className="text-xl font-bold text-sky-500 mt-2">
              ₹12,999 <span className="text-gray-400 line-through text-sm">₹15,999</span>
            </p>
            <p className="text-gray-600 mt-2">Curated collection of premium home décor accessories and lighting.</p>
            <button className="mt-4 w-full border border-sky-400 bg-white text-sky-500 py-2 rounded hover:bg-sky-100 flex justify-center items-center gap-2">
              🛒 Add to Cart
            </button>
          </div>
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-10">
          <button className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded shadow">
            View All Products
          </button>
        </div>
      </div>
      <footer className="bg-sky-100 text-gray-800 px-6 md:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h2 className="text-xl font-bold mb-2">Sidhatva</h2>
            <p className="mb-4">
              Designing spaces with soul. Premium furniture and home décor for modern living.
            </p>
            <p className="text-sm flex items-center gap-1">
              Made with <span className="text-red-600 text-lg">❤️</span> in India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Furniture</a></li>
              <li><a href="#" className="hover:underline">Sofas</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Returns</a></li>
              <li><a href="#" className="hover:underline">Shipping Info</a></li>
              <li><a href="#" className="hover:underline">Track Order</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-3">Stay Updated</h3>
            <p className="text-sm mb-3">
              Subscribe to get updates on new arrivals and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l-md bg-sky-200 text-sm outline-none"
              />
              <button className="bg-white px-4 py-2 text-sm font-medium rounded-r-md shadow hover:bg-sky-200 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t mt-10 pt-4 flex flex-col md:flex-row justify-between text-sm text-gray-600">
          <p>© 2025 Sidhatva. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;