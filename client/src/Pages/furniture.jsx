import React, { useState } from 'react';
import { FiHeart, FiShoppingCart, FiStar, FiChevronDown } from 'react-icons/fi';
import Card from '../Component/Card';
import { furniture } from '../Data/data';

const Furniture = () => {

  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);

  const categories = ["All", ...new Set(furniture.map(item => item.type))];

  const filteredFurniture = furniture.filter(item => {
    if (selectedCategory === "All") return true;
    return item.type === selectedCategory;
  });

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Furniture Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our complete range of premium furniture for every room in your home.
          </p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="w-full md:w-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Filter by:</h3>
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <button
                  onClick={() => setCategoryOpen(!isCategoryOpen)}
                  className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {selectedCategory}
                  <FiChevronDown className="ml-2 h-4 w-4" />
                </button>
                {isCategoryOpen && (
                  <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {categories.map(category => (
                        <a
                          key={category}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedCategory(category);
                            setCategoryOpen(false);
                          }}
                        >
                          {category}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Price Range
                  <FiChevronDown className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sort by:</h3>
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredFurniture.slice(0, visibleCount).map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>


        {/* Load More Button */}
        {visibleCount < filteredFurniture.length && (
          <div className="mt-12 text-center">
            <button onClick={loadMore} className="cursor-pointer inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Furniture;