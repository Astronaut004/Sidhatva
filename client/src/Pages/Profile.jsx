import React, { useState, useRef, useEffect } from 'react';
import { User, MapPin, Package, Heart, Settings, Camera, Edit, Plus, Trash2, Star, ArrowLeft, Loader2 } from 'lucide-react';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('personal');
    const [editingAddress, setEditingAddress] = useState(null);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    // State for user data
    const [userData, setUserData] = useState({
        id: 1,
        email: 'user@example.com',
        phone: '+91 9876543210',
        emailVerified: true,
        phoneVerified: true,
        rewardPoints: 2500,
        profile: {
            firstName: 'Rajesh',
            lastName: 'Kumar',
            dateOfBirth: '1985-06-15',
            gender: 'male',
            avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
            bio: 'Furniture enthusiast who loves modern design'
        }
    });

    const [addresses, setAddresses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    // API Base URL
    const API_BASE_URL = 'http://localhost:3001/api';

    // API Helper Functions
    const apiCall = async (endpoint, options = {}) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    };

    // User Data API
    const fetchUserData = async () => {
        try {
            setLoading(true);
            const data = await apiCall('/user/profile');
            setUserData(data);
        } catch (error) {
            setError('Failed to load user data');
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (profileData) => {
        try {
            setLoading(true);
            const data = await apiCall('/user/profile', {
                method: 'PUT',
                body: JSON.stringify(profileData)
            });
            setUserData(prev => ({ ...prev, profile: { ...prev.profile, ...data.profile } }));
            return data;
        } catch (error) {
            setError('Failed to update profile');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const uploadAvatar = async (file) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch(`${API_BASE_URL}/user/avatar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload avatar');
            }

            const data = await response.json();
            setUserData(prev => ({
                ...prev,
                profile: { ...prev.profile, avatarUrl: data.avatarUrl }
            }));
            return data;
        } catch (error) {
            setError('Failed to upload avatar');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Address APIs
    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const data = await apiCall('/user/addresses');
            setAddresses(data);
        } catch (error) {
            setError('Failed to load addresses');
            console.error('Error fetching addresses:', error);
        } finally {
            setLoading(false);
        }
    };

    const createAddress = async (addressData) => {
        try {
            setLoading(true);
            const data = await apiCall('/user/addresses', {
                method: 'POST',
                body: JSON.stringify(addressData)
            });
            setAddresses(prev => [...prev, data]);
            return data;
        } catch (error) {
            setError('Failed to create address');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateAddress = async (addressId, addressData) => {
        try {
            setLoading(true);
            const data = await apiCall(`/user/addresses/${addressId}`, {
                method: 'PUT',
                body: JSON.stringify(addressData)
            });
            setAddresses(prev => prev.map(addr => addr.id === addressId ? data : addr));
            return data;
        } catch (error) {
            setError('Failed to update address');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteAddress = async (addressId) => {
        try {
            setLoading(true);
            await apiCall(`/user/addresses/${addressId}`, {
                method: 'DELETE'
            });
            setAddresses(prev => prev.filter(addr => addr.id !== addressId));
        } catch (error) {
            setError('Failed to delete address');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Orders API
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await apiCall('/user/orders');
            setOrders(data);
        } catch (error) {
            setError('Failed to load orders');
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const reorderItems = async (orderId) => {
        try {
            setLoading(true);
            const data = await apiCall(`/orders/${orderId}/reorder`, {
                method: 'POST'
            });
            // Handle reorder response (e.g., redirect to cart)
            return data;
        } catch (error) {
            setError('Failed to reorder items');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Wishlist APIs
    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const data = await apiCall('/user/wishlist');
            setWishlistItems(data);
        } catch (error) {
            setError('Failed to load wishlist');
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            setLoading(true);
            await apiCall(`/user/wishlist/${productId}`, {
                method: 'DELETE'
            });
            setWishlistItems(prev => prev.filter(item => item.id !== productId));
        } catch (error) {
            setError('Failed to remove from wishlist');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            setLoading(true);
            const data = await apiCall('/cart/add', {
                method: 'POST',
                body: JSON.stringify({ productId, quantity })
            });
            // Handle add to cart response
            return data;
        } catch (error) {
            setError('Failed to add to cart');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Settings APIs
    const updateNotificationSettings = async (settings) => {
        try {
            setLoading(true);
            const data = await apiCall('/user/settings/notifications', {
                method: 'PUT',
                body: JSON.stringify(settings)
            });
            return data;
        } catch (error) {
            setError('Failed to update notification settings');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updatePrivacySettings = async (settings) => {
        try {
            setLoading(true);
            const data = await apiCall('/user/settings/privacy', {
                method: 'PUT',
                body: JSON.stringify(settings)
            });
            return data;
        } catch (error) {
            setError('Failed to update privacy settings');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        try {
            setLoading(true);
            const data = await apiCall('/user/change-password', {
                method: 'POST',
                body: JSON.stringify({ currentPassword, newPassword })
            });
            return data;
        } catch (error) {
            setError('Failed to change password');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteAccount = async () => {
        try {
            setLoading(true);
            await apiCall('/user/account', {
                method: 'DELETE'
            });
            // Handle account deletion (e.g., redirect to home page)
        } catch (error) {
            setError('Failed to delete account');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Event Handlers
    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                await uploadAvatar(file);
            } catch (error) {
                // Error is already handled in uploadAvatar
            }
        }
    };

    const handleAddressSubmit = async (addressData) => {
        try {
            if (editingAddress) {
                await updateAddress(editingAddress, addressData);
                setEditingAddress(null);
            } else {
                await createAddress(addressData);
            }
            setShowAddAddress(false);
        } catch (error) {
            // Error is already handled in API functions
        }
    };

    const handleDeleteAddress = async (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                await deleteAddress(addressId);
            } catch (error) {
                // Error is already handled in deleteAddress
            }
        }
    };

    const handleReorder = async (orderId) => {
        try {
            await reorderItems(orderId);
            // Show success message or redirect
            alert('Items added to cart successfully!');
        } catch (error) {
            // Error is already handled in reorderItems
        }
    };

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await removeFromWishlist(productId);
        } catch (error) {
            // Error is already handled in removeFromWishlist
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await addToCart(productId);
            alert('Product added to cart successfully!');
        } catch (error) {
            // Error is already handled in addToCart
        }
    };

    // Load data based on active tab
    useEffect(() => {
        switch (activeTab) {
            case 'personal':
                fetchUserData();
                break;
            case 'addresses':
                fetchAddresses();
                break;
            case 'orders':
                fetchOrders();
                break;
            case 'wishlist':
                fetchWishlist();
                break;
            default:
                break;
        }
    }, [activeTab]);

    // Initial load
    useEffect(() => {
        fetchUserData();
    }, []);

    const getStatusColor = (status) => {
        const colors = {
            pending: 'text-yellow-600 bg-yellow-50',
            confirmed: 'text-blue-600 bg-blue-50',
            processing: 'text-purple-600 bg-purple-50',
            shipped: 'text-indigo-600 bg-indigo-50',
            delivered: 'text-green-600 bg-green-50',
            cancelled: 'text-red-600 bg-red-50'
        };
        return colors[status] || 'text-gray-600 bg-gray-50';
    };

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: User },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    // Error Display Component
    const ErrorDisplay = ({ error, onDismiss }) => (
        error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex justify-between items-center">
                    <p className="text-red-600">{error}</p>
                    <button 
                        onClick={onDismiss}
                        className="text-red-400 hover:text-red-600"
                    >
                        ×
                    </button>
                </div>
            </div>
        )
    );

    // Loading Spinner Component
    const LoadingSpinner = () => (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
        </div>
    );

    return (
        <div className="min-h-screen bg-sky-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <ErrorDisplay error={error} onDismiss={() => setError(null)} />

                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <img
                                src={userData.profile.avatarUrl}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={loading}
                                className="absolute bottom-0 right-0 bg-sky-600 text-white p-2 rounded-full hover:bg-sky-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {userData.profile.firstName} {userData.profile.lastName}
                            </h1>
                            <p className="text-gray-600">{userData.email}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="flex items-center text-sm text-green-600">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Email Verified
                                </span>
                                <span className="flex items-center text-sm text-green-600">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Phone Verified
                                </span>
                                <span className="text-sm text-sky-600 font-medium">
                                    {userData.rewardPoints} Reward Points
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-4">
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            disabled={loading}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors disabled:opacity-50 ${activeTab === tab.id
                                                    ? 'bg-sky-50 text-sky-600 font-medium'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            {loading && <LoadingSpinner />}

                            {/* Personal Information */}
                            {activeTab === 'personal' && !loading && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                                        <button 
                                            className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                                            disabled={loading}
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit Profile
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                value={userData.profile.firstName}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-600"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                value={userData.profile.lastName}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={userData.email}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                value={userData.phone}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                            <input
                                                type="date"
                                                value={userData.profile.dateOfBirth}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                            <select
                                                value={userData.profile.gender}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                disabled
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                                <option value="prefer_not_to_say">Prefer not to say</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                        <textarea
                                            value={userData.profile.bio}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                            disabled
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Addresses */}
                            {activeTab === 'addresses' && !loading && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold text-gray-800">Saved Addresses</h2>
                                        <button
                                            onClick={() => setShowAddAddress(true)}
                                            disabled={loading}
                                            className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Address
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {addresses.map((address) => (
                                            <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="px-2 py-1 bg-sky-100 text-sky-600 text-xs font-medium rounded">
                                                                {address.type?.toUpperCase()}
                                                            </span>
                                                            {address.isDefault && (
                                                                <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded">
                                                                    DEFAULT
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="font-medium text-gray-800">{address.label}</h3>
                                                        <p className="text-gray-600">{address.recipientName}</p>
                                                        <p className="text-gray-600">{address.recipientPhone}</p>
                                                        <div className="text-gray-600 mt-1">
                                                            <p>{address.addressLine1}</p>
                                                            {address.addressLine2 && <p>{address.addressLine2}</p>}
                                                            <p>{address.city}, {address.state} - {address.postalCode}</p>
                                                            {address.landmark && <p>Landmark: {address.landmark}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingAddress(address.id)}
                                                            disabled={loading}
                                                            className="p-2 text-gray-400 hover:text-sky-600 transition-colors disabled:opacity-50"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteAddress(address.id)}
                                                            disabled={loading}
                                                            className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Orders */}
                            {activeTab === 'orders' && !loading && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Order History</h2>

                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">Order #{order.orderNumber}</h3>
                                                        <p className="text-sm text-gray-600">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-gray-800">₹{order.totalAmount?.toLocaleString()}</p>
                                                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                                            {order.status?.replace('_', ' ').toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    {order.items?.map((item, index) => (
                                                        <div key={index} className="flex justify-between text-sm">
                                                            <span className="text-gray-600">{item.productName} × {item.quantity}</span>
                                                            <span className="text-gray-800">₹{item.unitPrice?.toLocaleString()}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100">
                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                                        View Details
                                                    </button>
                                                    {order.status === 'delivered' && (
                                                        <button 
                                                            onClick={() => handleReorder(order.id)}
                                                            disabled={loading}
                                                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                                        >
                                                            Reorder
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Wishlist */}
                            {activeTab === 'wishlist' && !loading && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6">My Wishlist</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {wishlistItems.map((item) => (
                                            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.productName}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="p-4">
                                                    <h3 className="font-medium text-gray-800 mb-2">{item.productName}</h3>
                                                    <p className="text-sky-600 font-semibold text-lg">₹{item.price?.toLocaleString()}</p>
                                                    <div className="flex gap-2 mt-4">
                                                        <button 
                                                            onClick={() => handleAddToCart(item.id)}
                                                            disabled={loading}
                                                            className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50"
                                                        >
                                                            Add to Cart
                                                        </button>
                                                        <button 
                                                            onClick={() => handleRemoveFromWishlist(item.id)}
                                                            disabled={loading}
                                                            className="p-2 border border-gray-300 text-gray-400 hover:text-red-600 rounded-lg transition-colors disabled:opacity-50"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Settings */}
                            {activeTab === 'settings' && !loading && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h2>

                                    <div className="space-y-6">
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-medium text-gray-800 mb-2">Password</h3>
                                            <p className="text-gray-600 mb-4">Keep your account secure with a strong password</p>
                                            <button 
                                                onClick={() => {
                                                    // In a real app, this would open a password change modal/form
                                                    const currentPassword = prompt('Enter current password:');
                                                    const newPassword = prompt('Enter new password:');
                                                    if (currentPassword && newPassword) {
                                                        changePassword(currentPassword, newPassword);
                                                    }
                                                }}
                                                disabled={loading}
                                                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50"
                                            >
                                                Change Password
                                            </button>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-medium text-gray-800 mb-2">Notifications</h3>
                                            <div className="space-y-3">
                                                <label className="flex items-center">
                                                    <input 
                                                        type="checkbox" 
                                                        className="rounded border-gray-300 text-sky-600 focus:ring-sky-500" 
                                                        defaultChecked 
                                                        onChange={(e) => updateNotificationSettings({ emailOrders: e.target.checked })}
                                                        disabled={loading}
                                                    />
                                                    <span className="ml-3 text-gray-700">Email notifications for orders</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input 
                                                        type="checkbox" 
                                                        className="rounded border-gray-300 text-sky-600 focus:ring-sky-500" 
                                                        defaultChecked 
                                                        onChange={(e) => updateNotificationSettings({ smsDelivery: e.target.checked })}
                                                        disabled={loading}
                                                    />
                                                    <span className="ml-3 text-gray-700">SMS notifications for delivery</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input 
                                                        type="checkbox" 
                                                        className="rounded border-gray-300 text-sky-600 focus:ring-sky-500" 
                                                        onChange={(e) => updateNotificationSettings({ marketingEmails: e.target.checked })}
                                                        disabled={loading}
                                                    />
                                                    <span className="ml-3 text-gray-700">Marketing emails</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-medium text-gray-800 mb-2">Privacy</h3>
                                            <div className="space-y-3">
                                                <label className="flex items-center">
                                                    <input 
                                                        type="checkbox" 
                                                        className="rounded border-gray-300 text-sky-600 focus:ring-sky-500" 
                                                        defaultChecked 
                                                        onChange={(e) => updatePrivacySettings({ personalizedRecommendations: e.target.checked })}
                                                        disabled={loading}
                                                    />
                                                    <span className="ml-3 text-gray-700">Allow data for personalized recommendations</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input 
                                                        type="checkbox" 
                                                        className="rounded border-gray-300 text-sky-600 focus:ring-sky-500" 
                                                        onChange={(e) => updatePrivacySettings({ shareWithPartners: e.target.checked })}
                                                        disabled={loading}
                                                    />
                                                    <span className="ml-3 text-gray-700">Share data with partners for better service</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="border border-red-200 rounded-lg p-4">
                                            <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                                            <p className="text-gray-600 mb-4">Once you delete your account, there is no going back</p>
                                            <button 
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                                                        deleteAccount();
                                                    }
                                                }}
                                                disabled={loading}
                                                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                                            >
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;