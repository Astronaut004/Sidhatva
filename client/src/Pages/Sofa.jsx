import React, { useState } from 'react';
import { FiHeart, FiShoppingCart, FiStar, FiFilter, FiChevronDown, FiCheck } from 'react-icons/fi';

const SofaPage = () => {
  // Sofa types
  const sofaTypes = [
    { id: 'all', name: 'All Sofas' },
    { id: 'sectional', name: 'Sectional Sofas' },
    { id: 'loveseat', name: 'Loveseats' },
    { id: 'sofa-bed', name: 'Sofa Beds' },
    { id: 'recliner', name: 'Recliners' },
    { id: 'chaise', name: 'Chaise Lounges' },
  ];

  // Price ranges
  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'low', name: 'Under ₹30,000', min: 0, max: 30000 },
    { id: 'medium', name: '₹30,000 - ₹60,000', min: 30000, max: 60000 },
    { id: 'high', name: 'Over ₹60,000', min: 60000, max: Infinity },
  ];

  // Sofa data
  const sofaItems = [
    {
      id: 1,
      name: "Modern Velvet Sectional",
      type: "sectional",
      price: 54999,
      originalPrice: 64999,
      rating: 4.8,
      reviews: 142,
      description: "Elegant velvet sofa with wooden legs for a contemporary living room",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Classic Leather Recliner",
      type: "recliner",
      price: 32999,
      originalPrice: 39999,
      rating: 4.7,
      reviews: 98,
      description: "Premium leather recliner with adjustable headrest and footrest",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Convertible Sofa Bed",
      type: "sofa-bed",
      price: 42999,
      originalPrice: 49999,
      rating: 4.6,
      reviews: 87,
      description: "Space-saving sofa that converts to a comfortable queen-sized bed",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Minimalist Loveseat",
      type: "loveseat",
      price: 24999,
      originalPrice: 29999,
      rating: 4.5,
      reviews: 76,
      description: "Compact two-seater sofa with clean lines and comfortable cushions",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Luxury Chaise Lounge",
      type: "chaise",
      price: 38999,
      originalPrice: 45999,
      rating: 4.9,
      reviews: 112,
      description: "Elegant chaise lounge with premium fabric and curved design",
      image: "https://images.unsplash.com/photo-1573866926487-a1865558a9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Corner Sectional Sofa",
      type: "sectional",
      price: 72999,
      originalPrice: 84999,
      rating: 4.8,
      reviews: 124,
      description: "Spacious L-shaped sectional with removable cushions and storage",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
  ];

  // State for filters
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Filter sofas based on selections
  const filteredSofas = sofaItems.filter(sofa => {
    const typeMatch = selectedType === 'all' || sofa.type === selectedType;
    
    let priceMatch = true;
    if (selectedPrice !== 'all') {
      const range = priceRanges.find(r => r.id === selectedPrice);
      priceMatch = sofa.price >= range.min && sofa.price <= range.max;
    }
    
    return typeMatch && priceMatch;
  });

  // Toggle favorite
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Your Perfect Sofa</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Explore our premium collection of sofas designed for comfort, style, and durability.
            Find the perfect centerpiece for your living space.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Shop Collection
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Sofa Collection</h2>
            <p className="text-gray-600 mt-2">{filteredSofas.length} products available</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {/* Sofa Type Filter */}
            <div className="relative">
              <button 
                onClick={() => setIsTypeOpen(!isTypeOpen)}
                className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 text-gray-700 w-60"
                aria-expanded={isTypeOpen}
              >
                <div className="flex items-center">
                  <FiFilter className="mr-2 text-blue-600" />
                  <span>{sofaTypes.find(t => t.id === selectedType)?.name || "Sofa Type"}</span>
                </div>
                <FiChevronDown className={`ml-2 transition-transform ${isTypeOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isTypeOpen && (
                <div className="absolute z-10 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="py-2">
                    {sofaTypes.map(type => (
                      <button
                        key={type.id}
                        className={`flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 ${
                          selectedType === type.id ? 'bg-blue-50 text-blue-600 font-medium' : ''
                        }`}
                        onClick={() => {
                          setSelectedType(type.id);
                          setIsTypeOpen(false);
                        }}
                      >
                        {selectedType === type.id && <FiCheck className="mr-2 text-blue-600" />}
                        {type.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Price Range Filter */}
            <div className="relative">
              <button 
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 text-gray-700 w-60"
                aria-expanded={isPriceOpen}
              >
                <div className="flex items-center">
                  <FiFilter className="mr-2 text-blue-600" />
                  <span>{priceRanges.find(p => p.id === selectedPrice)?.name || "Price Range"}</span>
                </div>
                <FiChevronDown className={`ml-2 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isPriceOpen && (
                <div className="absolute z-10 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="py-2">
                    {priceRanges.map(range => (
                      <button
                        key={range.id}
                        className={`flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 ${
                          selectedPrice === range.id ? 'bg-blue-50 text-blue-600 font-medium' : ''
                        }`}
                        onClick={() => {
                          setSelectedPrice(range.id);
                          setIsPriceOpen(false);
                        }}
                      >
                        {selectedPrice === range.id && <FiCheck className="mr-2 text-blue-600" />}
                        {range.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sofa Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSofas.map(sofa => (
            <div 
              key={sofa.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative">
                <img 
                  src={sofa.image} 
                  alt={sofa.name} 
                  className="w-full h-64 object-cover"
                />
                <button 
                  onClick={() => toggleFavorite(sofa.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    favorites.includes(sofa.id) 
                      ? 'text-red-500 bg-red-50' 
                      : 'text-gray-500 bg-white'
                  } shadow-md hover:bg-gray-100 transition-colors`}
                  aria-label={favorites.includes(sofa.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <FiHeart className="h-5 w-5" />
                </button>
                {sofa.originalPrice && (
                  <div className="absolute bottom-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    Save ₹{(sofa.originalPrice - sofa.price).toLocaleString()}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{sofa.name}</h3>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
                    {sofa.type.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(sofa.rating) 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{sofa.rating} ({sofa.reviews} reviews)</span>
                </div>
                
                <p className="text-gray-600 mb-6">{sofa.description}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-bold text-gray-900">₹{sofa.price.toLocaleString()}</span>
                    {sofa.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">₹{sofa.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredSofas.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No sofas match your filters</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more options</p>
            <button 
              className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                setSelectedType('all');
                setSelectedPrice('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Sofas?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              We're committed to quality, comfort, and style in every piece we create.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">✓</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Materials</h3>
              <p className="text-gray-600">
                Crafted with top-grade fabrics, leathers, and sustainable woods for lasting comfort.
              </p>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">✓</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Craftsmanship</h3>
              <p className="text-gray-600">
                Each sofa is meticulously assembled by skilled artisans with attention to detail.
              </p>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">✓</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">5-Year Warranty</h3>
              <p className="text-gray-600">
                Peace of mind with our comprehensive warranty on all frames and mechanisms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Choosing Your Sofa?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Our design experts are ready to help you find the perfect sofa for your space and lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full shadow-lg transition-colors">
              Book a Consultation
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-blue-700 font-bold py-3 px-8 rounded-full transition-colors">
              Visit Our Showroom
            </button>
          </div>
        </div>
      </div>
    </div>


  );
};

export default SofaPage;