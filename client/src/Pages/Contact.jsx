import React from 'react';

const ContactUs = () => {
  return (
    <>
      <div className="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">
            Contact <span className="text-sky-400">Us</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Have questions about our furniture or need help designing your space? We're here
            to help you create the perfect home.
          </p>
          <div className="h-1 w-20 bg-sky-300 mx-auto mt-4 rounded"></div>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Form Section */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Message</label>
                <textarea
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-300 to-sky-400 text-white font-medium py-2 rounded hover:from-sky-400 hover:to-sky-500"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
            <div className="bg-white shadow rounded p-6">
              <div className="text-4xl text-sky-300 mb-2">📞</div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-sm text-gray-500 mt-1">+91 9876543210</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <div className="text-4xl text-sky-300 mb-2">📧</div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-gray-500 mt-1">hello@sidhatva.com</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <div className="text-4xl text-sky-300 mb-2">📍</div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-sm text-gray-500 mt-1">
                123 Furniture Street, Mumbai, India
              </p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <div className="text-4xl text-sky-300 mb-2">⏰</div>
              <h3 className="font-semibold">Hours</h3>
              <p className="text-sm text-gray-500 mt-1">Mon-Sat: 9AM–7PM</p>
            </div>
            <div className="col-span-1 sm:col-span-2 bg-sky-50 text-center p-6 rounded shadow">
              <div className="text-4xl text-sky-300 mb-2">📍</div>
              <h3 className="font-semibold">Visit Our Showroom</h3>
              <p className="text-sm text-gray-500 mt-1">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Sidhatva</h3>
              <p className="mb-4">
                Designing spaces with soul. Premium furniture and home décor for modern living.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Our Collections</a></li>
                <li><a href="#" className="hover:text-white transition">Design Services</a></li>
                <li><a href="#" className="hover:text-white transition">Showrooms</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-white transition">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition">Warranty</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Design Street, Mumbai, Maharashtra 400001</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>hello@sidhatva.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Sidhatva. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactUs;
