import React, { useState, useEffect } from 'react';
import { featured_product } from '../Data/data';
import Card from '../Component/Card';
import { Link } from 'react-router-dom';
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans">
      {/* Navigation */}


      {/* Hero Section */}
      <div className="bg-sky-50 pt-16 pb-16 md:pb-24 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 lg:gap-16">
          {/* Left Section */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Transform Your <br className="hidden md:block" />
              <span className="text-sky-600">Living Space</span>
            </h1>
            <p className="text-gray-600 mt-4 text-lg md:text-xl max-w-lg">
              Discover premium furniture and home décor that brings comfort, style, and personality to every corner of your home.
            </p>

            {/* Buttons Container */}
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
              {/* Dropdown */}
              <div className="relative inline-block text-left">
                {/* Toggle Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex justify-center items-center px-5 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Browse Categories
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        All Categories
                      </a>
                      <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Sofas & Seating
                      </a>
                      <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Beds & Mattresses
                      </a>
                      <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Dining & Kitchen
                      </a>
                      <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Lighting & Décor
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Shop Now Button */}
              <button className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow hover:bg-sky-700 transition duration-300 flex items-center">
                Shop Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Quality Tag */}
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-6">
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-3 h-3 bg-sky-500 rounded-full inline-block mr-2"></span>
                Premium Quality Materials
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-3 h-3 bg-sky-500 rounded-full inline-block mr-2"></span>
                Free Shipping Over ₹10,000
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-3 h-3 bg-sky-500 rounded-full inline-block mr-2"></span>
                5-Year Warranty
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 relative mt-10 md:mt-0">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1170&auto=format&fit=crop"
                alt="Premium Sofa"
                className="rounded-xl shadow-lg w-full object-cover max-h-[500px]"
              />
              {/* Price Tag */}
              <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg px-5 py-4 text-center">
                <p className="text-gray-500 text-sm">Starting from</p>
                <p className="text-sky-600 font-bold text-xl">₹29,999</p>
                <p className="text-gray-600 text-sm">Premium Sofas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Featherlite', 'The Sleep Company', 'Indigo Living', 'Brand 4', 'Brand 5'].map((brand, index) => (
              <div key={index} className="text-gray-400 font-medium text-xl opacity-70 hover:opacity-100 transition-opacity">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked furniture pieces that combine style, comfort, and quality craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured_product.slice(0, 4).map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to='furniture' className="cursor-pointer px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg shadow transition">
              View All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-sky-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of happy customers across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                location: "Mumbai",
                rating: 5,
                comment: "The quality of the furniture exceeded my expectations. Delivery was prompt and the assembly team was very professional.",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Priya Patel",
                location: "Delhi",
                rating: 4,
                comment: "Beautiful design and sturdy construction. The only reason I'm not giving 5 stars is because the delivery was delayed by 2 days.",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Arjun Mehta",
                location: "Bangalore",
                rating: 5,
                comment: "Absolutely love my new dining set! The craftsmanship is impeccable and it looks even better in person than in the photos.",
                avatar: "https://randomuser.me/api/portraits/men/75.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get 10% Off Your First Order</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and receive exclusive offers, new product alerts, and interior design tips.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button className="bg-sky-800 hover:bg-sky-900 px-6 py-3 rounded-r-lg font-medium transition">
              Subscribe
            </button>
          </div>
          <p className="text-sm mt-3 text-sky-100">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default Home;