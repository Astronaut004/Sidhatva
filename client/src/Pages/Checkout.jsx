import React, { useState, useEffect } from 'react';
import {
    ShoppingBag, MapPin, CreditCard, Truck, Calendar,
    Plus, Edit, Trash2, Check, ChevronRight, ChevronLeft,
    Shield, Clock, AlertCircle, Package, Home, Building,
    Wallet, Smartphone, Gift, Tag, Loader2
} from 'lucide-react';

const Checkout = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [selectedDelivery, setSelectedDelivery] = useState('standard');
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(null);

    // Mock cart data
    const [cartItems] = useState([
        {
            id: 1,
            name: 'Modern 3-Seater Sofa',
            color: 'Charcoal Grey',
            size: 'Large',
            price: 45999,
            originalPrice: 55999,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200',
            warranty: '5 years',
            inStock: true
        },
        {
            id: 2,
            name: 'Oak Wood Coffee Table',
            color: 'Natural Oak',
            size: 'Medium',
            price: 12999,
            originalPrice: 15999,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200',
            warranty: '2 years',
            inStock: true
        },
        {
            id: 3,
            name: 'Ergonomic Office Chair',
            color: 'Black',
            size: 'Adjustable',
            price: 18999,
            originalPrice: 22999,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=200',
            warranty: '3 years',
            inStock: true
        }
    ]);

    // Mock addresses data
    const [addresses] = useState([
        {
            id: 1,
            type: 'home',
            name: 'Rajesh Kumar',
            phone: '+91 9876543210',
            address: '123 MG Road, Near Metro Station',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            landmark: 'Opposite Big Bazaar',
            isDefault: true
        },
        {
            id: 2,
            type: 'work',
            name: 'Rajesh Kumar',
            phone: '+91 9876543210',
            address: '456 Business Park, Tower B, Floor 5',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400070',
            landmark: 'Near IT Hub',
            isDefault: false
        }
    ]);

    // Mock payment methods
    const [paymentMethods] = useState([
        { id: 'card_1', type: 'card', last4: '4242', brand: 'Visa', expiry: '12/25' },
        { id: 'card_2', type: 'card', last4: '8888', brand: 'Mastercard', expiry: '09/26' },
        { id: 'upi', type: 'upi', upiId: 'user@paytm' },
        { id: 'wallet', type: 'wallet', provider: 'Paytm', balance: 2500 },
        { id: 'cod', type: 'cod', name: 'Cash on Delivery' }
    ]);

    const deliveryOptions = [
        {
            id: 'standard',
            name: 'Standard Delivery',
            time: '5-7 business days',
            price: 0,
            description: 'Free delivery to your doorstep'
        },
        {
            id: 'express',
            name: 'Express Delivery',
            time: '2-3 business days',
            price: 299,
            description: 'Faster delivery with priority handling'
        },
        {
            id: 'installation',
            name: 'White Glove Service',
            time: '7-10 business days',
            price: 999,
            description: 'Delivery + professional installation & setup'
        }
    ];

    // Mock Functions (Frontend only - no API calls)
    const applyPromoCode = (code) => {
        setLoading(true);
        setTimeout(() => {
            if (code.toLowerCase() === 'save10') {
                setPromoApplied({ code: 'SAVE10', discount: 1000 });
                setError(null);
            } else if (code.toLowerCase() === 'welcome20') {
                setPromoApplied({ code: 'WELCOME20', discount: 2000 });
                setError(null);
            } else {
                setError('Invalid promo code. Try SAVE10 or WELCOME20');
            }
            setLoading(false);
        }, 1000);
    };

    const processPayment = (paymentData) => {
        setLoading(true);
        setTimeout(() => {
            // Mock success
            alert(`Order placed successfully! Order ID: ORD-${Date.now()}`);
            setLoading(false);
        }, 2000);
    };

    // Calculations
    const calculations = {
        subtotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        discount: cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0),
        promoDiscount: promoApplied?.discount || 0,
        deliveryFee: deliveryOptions.find(d => d.id === selectedDelivery)?.price || 0,
        get total() {
            return this.subtotal - this.promoDiscount + this.deliveryFee;
        }
    };

    // Initialize default selections
    useEffect(() => {
        const defaultAddress = addresses.find(addr => addr.isDefault);
        if (defaultAddress) {
            setSelectedAddress(defaultAddress);
        }
        // Set a default payment method, e.g., the first one in the list
        if (paymentMethods.length > 0) {
            setSelectedPayment(paymentMethods[0].id);
        }
    }, [addresses, paymentMethods]);

    const steps = [
        { id: 1, name: 'Cart Review', icon: ShoppingBag },
        { id: 2, name: 'Delivery', icon: MapPin },
        { id: 3, name: 'Payment', icon: CreditCard },
        { id: 4, name: 'Review', icon: Check }
    ];

    const getAddressIcon = (type) => {
        switch (type) {
            case 'home': return Home;
            case 'work': return Building;
            default: return MapPin;
        }
    };

    const getPaymentIcon = (type) => {
        switch (type) {
            case 'card': return CreditCard;
            case 'upi': return Smartphone;
            case 'wallet': return Wallet;
            case 'cod': return Package;
            default: return CreditCard;
        }
    };

    const handleNext = () => {
        if (currentStep === 2 && !selectedAddress) {
            setError('Please select a delivery address');
            return;
        }
        
        if (currentStep === 3 && !selectedPayment) {
            setError('Please select a payment method');
            return;
        }

        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
            setError(null);
        }
    };

    const handlePlaceOrder = () => {
        if (!selectedAddress || !selectedPayment) {
            setError('Please complete all required fields');
            return;
        }

        processPayment({
            method: selectedPayment,
            amount: calculations.total
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-600">Complete your purchase in a few simple steps</p>
                </div>

                {/* Progress Steps */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;
                            
                            return (
                                <div key={step.id} className="flex items-center">
                                    <div className="flex items-center">
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                            isCompleted ? 'bg-green-600 text-white' :
                                            isActive ? 'bg-sky-600 text-white' :
                                            'bg-gray-200 text-gray-500'
                                        }`}>
                                            {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                        </div>
                                        <span className={`ml-3 font-medium ${
                                            isActive ? 'text-sky-600' : 'text-gray-500'
                                        }`}>
                                            {step.name}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <ChevronRight className="w-5 h-5 text-gray-300 mx-4" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-red-700">{error}</p>
                        <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">×</button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Step 1: Cart Review */}
                        {currentStep === 1 && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Items</h2>
                                
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {item.color} • {item.size} • {item.warranty} warranty
                                                </p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="font-semibold text-sky-600">₹{item.price.toLocaleString()}</span>
                                                    {item.originalPrice > item.price && (
                                                        <span className="text-sm text-gray-500 line-through">
                                                            ₹{item.originalPrice.toLocaleString()}
                                                        </span>
                                                    )}
                                                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </p>
                                                {item.inStock ? (
                                                    <span className="text-sm text-green-600 flex items-center gap-1">
                                                        <Check className="w-3 h-3" /> In Stock
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-red-600">Out of Stock</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Delivery Address */}
                        {currentStep === 2 && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
                                        <Plus className="w-4 h-4" />
                                        Add Address
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {addresses.map((address) => {
                                        const Icon = getAddressIcon(address.type);
                                        return (
                                            <div
                                                key={address.id}
                                                onClick={() => setSelectedAddress(address)}
                                                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                                    selectedAddress?.id === address.id
                                                        ? 'border-sky-600 bg-sky-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start gap-3">
                                                        <Icon className="w-5 h-5 text-gray-600 mt-1" />
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-medium text-gray-900">{address.name}</span>
                                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded uppercase">
                                                                    {address.type}
                                                                </span>
                                                                {address.isDefault && (
                                                                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded">
                                                                        DEFAULT
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-gray-600">{address.phone}</p>
                                                            <p className="text-gray-700 mt-1">{address.address}</p>
                                                            <p className="text-gray-600">
                                                                {address.city}, {address.state} - {address.pincode}
                                                            </p>
                                                            {address.landmark && (
                                                                <p className="text-gray-500 text-sm">Landmark: {address.landmark}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button className="p-1 text-gray-400 hover:text-sky-600">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-1 text-gray-400 hover:text-red-600">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Delivery Options */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Options</h3>
                                    <div className="space-y-3">
                                        {deliveryOptions.map((option) => (
                                            <div
                                                key={option.id}
                                                onClick={() => setSelectedDelivery(option.id)}
                                                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                                    selectedDelivery === option.id
                                                        ? 'border-sky-600 bg-sky-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-3">
                                                            <Truck className="w-5 h-5 text-gray-600" />
                                                            <div>
                                                                <h4 className="font-medium text-gray-900">{option.name}</h4>
                                                                <p className="text-sm text-gray-600">{option.description}</p>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <Clock className="w-4 h-4 text-gray-500" />
                                                                    <span className="text-sm text-gray-600">{option.time}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-gray-900">
                                                            {option.price === 0 ? 'Free' : `₹${option.price}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment */}
                        {currentStep === 3 && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>

                                <div className="space-y-4">
                                    {paymentMethods.map((method) => {
                                        const Icon = getPaymentIcon(method.type);
                                        return (
                                            <div
                                                key={method.id}
                                                onClick={() => setSelectedPayment(method.id)}
                                                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                                    selectedPayment === method.id
                                                        ? 'border-sky-600 bg-sky-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon className="w-5 h-5 text-gray-600" />
                                                    <div>
                                                        {method.type === 'card' && (
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    {method.brand} ending in {method.last4}
                                                                </p>
                                                                <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                                                            </div>
                                                        )}
                                                        {method.type === 'upi' && (
                                                            <div>
                                                                <p className="font-medium text-gray-900">UPI</p>
                                                                <p className="text-sm text-gray-600">{method.upiId}</p>
                                                            </div>
                                                        )}
                                                        {method.type === 'wallet' && (
                                                            <div>
                                                                <p className="font-medium text-gray-900">{method.provider} Wallet</p>
                                                                <p className="text-sm text-gray-600">Balance: ₹{method.balance}</p>
                                                            </div>
                                                        )}
                                                        {method.type === 'cod' && (
                                                            <div>
                                                                <p className="font-medium text-gray-900">Cash on Delivery</p>
                                                                <p className="text-sm text-gray-600">Pay when you receive</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Security Note */}
                                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-green-600" />
                                        <p className="text-sm text-green-800">
                                            Your payment information is secure and encrypted
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Review & Confirm */}
                        {currentStep === 4 && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>

                                {/* Address Summary */}
                                <div className="mb-6">
                                    <h3 className="font-medium text-gray-900 mb-3">Delivery Address</h3>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="font-medium">{selectedAddress?.name}</p>
                                        <p className="text-gray-600">{selectedAddress?.address}</p>
                                        <p className="text-gray-600">
                                            {selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pincode}
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Summary */}
                                <div className="mb-6">
                                    <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        {(() => {
                                            const method = paymentMethods.find(m => m.id === selectedPayment);
                                            if (!method) return null;
                                            
                                            if (method.type === 'card') {
                                                return <p>{method.brand} ending in {method.last4}</p>;
                                            }
                                            if (method.type === 'upi') {
                                                return <p>UPI - {method.upiId}</p>;
                                            }
                                            if (method.type === 'wallet') {
                                                return <p>{method.provider} Wallet</p>;
                                            }
                                            if (method.type === 'cod') {
                                                return <p>Cash on Delivery</p>;
                                            }
                                        })()}
                                    </div>
                                </div>

                                {/* Items Summary */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
                                    <div className="space-y-3">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">{item.name}</p>
                                                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                                    <span className="font-medium">₹{calculations.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>Savings</span>
                                    <span>-₹{calculations.discount.toLocaleString()}</span>
                                </div>
                                {promoApplied && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Promo ({promoApplied.code})</span>
                                        <span>-₹{promoApplied.discount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery Fee</span>
                                    <span className="font-medium">
                                        {calculations.deliveryFee === 0 ? 'Free' : `₹${calculations.deliveryFee.toLocaleString()}`}
                                    </span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold">Total</span>
                                        <span className="text-lg font-semibold text-sky-600">₹{calculations.total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Code */}
                            {currentStep >= 2 && (
                                <div className="mt-6">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Enter promo code"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                        />
                                        <button
                                            onClick={() => applyPromoCode(promoCode)}
                                            disabled={!promoCode || loading}
                                            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50"
                                        >
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Tag className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mt-6 space-y-3">
                                {currentStep < 4 ? (
                                    <button
                                        onClick={handleNext}
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continue'}
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Place Order'}
                                        <Package className="w-4 h-4" />
                                    </button>
                                )}

                                {currentStep > 1 && (
                                    <button
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Back
                                    </button>
                                )}
                            </div>

                            {/* Estimated Delivery */}
                            {selectedDelivery && (
                                <div className="mt-6 p-4 bg-sky-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-4 h-4 text-sky-600" />
                                        <span className="text-sm font-medium text-sky-900">Estimated Delivery</span>
                                    </div>
                                    <p className="text-sm text-sky-700">
                                        {deliveryOptions.find(d => d.id === selectedDelivery)?.time}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;