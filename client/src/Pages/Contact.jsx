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
    </>
  );
};

export default ContactUs;
