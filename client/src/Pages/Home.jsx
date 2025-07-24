import React from 'react';

const Home = () => {
  return (
    <div className="font-sans antialiased text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555041409-f74c945b5179?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white p-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">Discover Your Perfect Furniture</h1>
          <p className="text-xl md:text-2xl mb-8">Quality Furniture for Every Style and Space</p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300">Shop Now</button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">About SIDHATVA Furniture</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            SIDHATVA is your premier destination for high-quality furniture that blends comfort, style, and durability. 
            We offer a wide selection of pieces for every room in your home, from modern minimalist designs to timeless classics. 
            Our commitment is to help you create spaces that are not only beautiful but also truly reflect your personal taste and lifestyle.
          </p>
          <button className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300">Our Story</button>
        </div>
      </section>

      {/* Furniture Categories Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Explore Our Furniture Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category Card 1: Living Room */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1593044277386-5204277386?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Living Room Furniture" className="w-full h-64 object-cover"/>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold mb-2">Living Room</h3>
                <p className="text-gray-700 mb-4">Sofas, coffee tables, TV units, and more to create your perfect living space.</p>
                <a href="#" className="text-blue-600 hover:underline">Shop Living Room</a>
              </div>
            </div>
            {/* Category Card 2: Bedroom */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Bedroom Furniture" className="w-full h-64 object-cover"/>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold mb-2">Bedroom</h3>
                <p className="text-gray-700 mb-4">Beds, wardrobes, nightstands, and dressers for a serene retreat.</p>
                <a href="#" className="text-blue-600 hover:underline">Shop Bedroom</a>
              </div>
            </div>
            {/* Category Card 3: Dining Room */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1592078615290-03ee24f624e5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Dining Room Furniture" className="w-full h-64 object-cover"/>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold mb-2">Dining Room</h3>
                <p className="text-gray-700 mb-4">Dining tables, chairs, and buffets for memorable meals.</p>
                <a href="#" className="text-blue-600 hover:underline">Shop Dining Room</a>
              </div>
            </div>
            {/* Category Card 4: Storage & Organization */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1528731708534-816fe59f90d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Storage & Organization" className="w-full h-64 object-cover"/>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold mb-2">Storage & Organization</h3>
                <p className="text-gray-700 mb-4">Shelves, cabinets, and drawers to keep your home tidy and stylish.</p>
                <a href="#" className="text-blue-600 hover:underline">Shop Storage</a>
              </div>
            </div>
            {/* Category Card 5: Sofas */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1555041409-f74c945b5179?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sofas" className="w-full h-64 object-cover"/>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold mb-2">Sofas</h3>
                <p className="text-gray-700 mb-4">Comfortable and stylish sofas for every living room.</p>
                <a href="#" className="text-blue-600 hover:underline">Shop Sofas</a>
              </div>
            </div>
            {/* Category Card 6: Office Furniture */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1599696848652-f08ff2465554?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Office Furniture" className="w-full h-64 object-cover"/>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold mb-2">Office Furniture</h3>
                <p className="text-gray-700 mb-4">Desks, chairs, and storage solutions for a productive workspace.</p>
                <a href="#" className="text-blue-600 hover:underline">Shop Office Furniture</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Find Your Perfect Piece Today!</h2>
          <p className="text-xl mb-8">Browse our extensive catalog and transform your home with SIDHATVA furniture.</p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300">Explore All Furniture</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SIDHATVA Furniture. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
