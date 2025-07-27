import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Card from '../Component/Card';
import { electronic } from '../Data/data';

const Electronics = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isPriceRangeOpen, setPriceRangeOpen] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState("Price Range");

  const [visibleCount, setVisibleCount] = useState(4);

  // Refs for outside click detection
  const categoryRef = useRef(null);
  const priceRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setPriceRangeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const categories = ["All", ...new Set(electronic.map(item => item.type))];

  const filteredElectronics = electronic.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.type === selectedCategory;

    let matchesPriceRange = true;
    if (selectedPriceRange !== "All") {
      const price = item.price;
      if (selectedPriceRange === "Under ₹5,000") {
        matchesPriceRange = price < 5000;
      } else if (selectedPriceRange === "₹5,000 - ₹10,000") {
        matchesPriceRange = price >= 5000 && price <= 10000;
      } else if (selectedPriceRange === "₹10,000 - ₹20,000") {
        matchesPriceRange = price >= 10000 && price <= 20000;
      } else if (selectedPriceRange === "Over ₹20,000") {
        matchesPriceRange = price > 20000;
      }
    }

    return matchesCategory && matchesPriceRange;
  });

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Electronics Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our wide range of electronics for every need.
          </p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="w-full md:w-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Filter by:</h3>
            <div className="flex flex-wrap gap-4">

              {/* Category Filter */}
              <div className="relative" ref={categoryRef}>
                <button
                  onClick={() => setCategoryOpen(!isCategoryOpen)}
                  className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {selectedCategory}
                  <FiChevronDown className="ml-2 h-4 w-4" />
                </button>
                {isCategoryOpen && (
                  <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
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

              {/* Price Range Filter */}
              <div className="relative" ref={priceRef}>
                <button
                  onClick={() => setPriceRangeOpen(!isPriceRangeOpen)}
                  className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {selectedPriceRange}
                  <FiChevronDown className="ml-2 h-4 w-4" />
                </button>
                {isPriceRangeOpen && (
                  <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {["All", "Under ₹5,000", "₹5,000 - ₹10,000", "₹10,000 - ₹20,000", "Over ₹20,000"].map(range => (
                        <a
                          key={range}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedPriceRange(range);
                            setPriceRangeOpen(false);
                          }}
                        >
                          {range}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sort Dropdown (Native Select) */}
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
          {filteredElectronics.slice(0, visibleCount).map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredElectronics.length && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              className="cursor-pointer inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Electronics;
