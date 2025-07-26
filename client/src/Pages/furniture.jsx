import React from 'react';
import { FiHeart, FiShoppingCart, FiStar, FiChevronDown } from 'react-icons/fi';

const Furniture = () => {
  // Sample furniture data with image URLs
  const furnitureItems = [
    {
      id: 1,
      name: "Modern Wooden Dining Table",
      category: "Dining",
      rating: 4.8,
      reviews: 124,
      price: 45999,
      originalPrice: 52999,
      description: "Elegant solid wood dining table perfect for family gatherings.",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Comfortable Office Chair",
      category: "Office",
      rating: 4.6,
      
      reviews: 89,
      price: 12999,
      originalPrice: 15999,
      description: "Ergonomic office chair with lumbar support and adjustable height.",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "King Size Platform Bed",
      category: "Bedroom",
      rating: 4.9,
      reviews: 156,
      price: 35999,
      originalPrice: 42999,
      description: "Minimalist platform bed with built-in storage compartments.",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Vintage Bookshelf",
      category: "Storage",
      rating: 4.7,
      reviews: 67,
      price: 18999,
      originalPrice: 22999,
      description: "Rustic wooden bookshelf with 5 spacious shelves.",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Glass Coffee Table",
      category: "Living Room",
      rating: 4.5,
      reviews: 43,
      price: 22999,
      originalPrice: 28999,
      description: "Modern tempered glass coffee table with chrome legs.",
      image: "https://images.unsplash.com/photo-1567538096612-2f638338e1e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Wardrobe with Mirror",
      category: "Bedroom",
      rating: 4.8,
      reviews: 98,
      price: 65999,
      originalPrice: 75999,
      description: "Spacious 3-door wardrobe with full-length mirror and drawers.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [isCategoryOpen, setCategoryOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const categories = ["All", ...new Set(furnitureItems.map(item => item.category))];

  const filteredFurniture = furnitureItems.filter(item => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

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
                  <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFurniture.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-64 object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <FiHeart className="h-5 w-5 text-gray-600" />
                </button>
                <div className="absolute bottom-3 left-3 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded">
                  {item.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <FiStar className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium text-gray-900">{item.rating}</span>
                    <span className="mx-1 text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{item.reviews} reviews</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-xl font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                  {item.originalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">{item.description}</p>
                
                <div className="flex space-x-3">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
                    Add to Cart
                  </button>
                  <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <FiShoppingCart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Furniture;