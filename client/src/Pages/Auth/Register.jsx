import React, { useState, useEffect } from 'react';
import AlertBox from '../../ui/AlertBox';
const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
    };
    const validateEmail = (email) => {
        // Basic email regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && !email.includes('+');
    };

    const validatePassword = (password) => {
        // Check length (minimum 8 characters)
        if (password.length < 8) {
            return { isValid: false, message: 'Password must be at least 8 characters long' };
        }

        // Check for uppercase letter
        if (!/[A-Z]/.test(password)) {
            return { isValid: false, message: 'Password must contain at least one uppercase letter (A-Z)' };
        }

        // Check for lowercase letter
        if (!/[a-z]/.test(password)) {
            return { isValid: false, message: 'Password must contain at least one lowercase letter (a-z)' };
        }

        // Check for number
        if (!/[0-9]/.test(password)) {
            return { isValid: false, message: 'Password must contain at least one number (0-9)' };
        }

        // Check for special character
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return { isValid: false, message: 'Password must contain at least one special character (!@#$%^&* etc.)' };
        }

        return { isValid: true, message: '' };
    };

    const authHandle = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation - check if fields are empty
        if (!name.trim() || !email.trim() || !password.trim()) {
            showAlert('error', 'Please fill in all fields');
            setLoading(false);
            return;
        }

        // Validate email format and no + symbol
        if (!validateEmail(email.trim())) {
            showAlert('error', 'Please enter a valid email address (+ symbol not allowed)');
            setLoading(false);
            return;
        }

        // Validate password requirements
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            showAlert('error', passwordValidation.message);
            setLoading(false);
            return;
        }

        const payload = {
            name: name.trim(),
            email: email.trim(),
            password: password
        };

        try {
            console.log(`your api is here:  ${import.meta.env.VITE_BACKEND_API}/api/auth/register`);
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to register');
            }

            console.log('Registration successful:', data);
            showAlert('success', 'Account created successfully! Welcome aboard!');

            // Store token if needed
            if (data.token) {
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('user', JSON.stringify(data.user));
            }

            // Clear form on success
            setName('');
            setEmail('');
            setPassword('');

            // Navigate after success (uncomment when using with router)
            // setTimeout(() => {
            //     navigate('/dashboard');
            // }, 2000);

        } catch (err) {
            console.error('Registration error:', err);
            showAlert('error', err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
            {/* Alert Box - Fixed position at top-right */}
            <AlertBox alert={alert} setAlert={setAlert} />
            {/* <div className={`fixed top-30 right-5 w-80 z-50 transition-all duration-300 ease-in-out ${alert.show
                    ? 'transform translate-x-0 opacity-100'
                    : 'transform translate-x-full opacity-0 pointer-events-none'
                }`}>
                <div
                    className={`relative rounded-lg shadow-lg p-4 ${alert.type === 'success'
                            ? 'bg-green-50 border-l-4 border-green-500 text-green-800'
                            : 'bg-red-50 border-l-4 border-red-500 text-red-800'
                        }`}
                >
                    {/* Progress slider */}
                    {/* <div
                        className={`absolute top-0 left-0 h-1 rounded-t-lg ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                            } ${alert.show ? 'animate-pulse' : ''}`}
                        style={{
                            width: alert.show ? '100%' : '0%',
                            transition: alert.show ? 'width 3s linear' : 'none',
                        }}
                    ></div>

                    <div className="flex items-center gap-3">
                        <div>
                            <strong className="font-semibold">
                                {alert.type === 'success' ? 'Success!' : 'Error!'}
                            </strong>
                            <span className="ml-2">{alert.message}</span>
                        </div>
                    </div>
                </div>
            </div>  */}

            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
                    <p className="text-gray-500 mt-2">Join us and start exploring premium products.</p>
                </div>

                <div className="space-y-5">
                    {/* Full Name */}
                    <div className="relative">
                        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 text-lg">👤</div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 text-lg">✉️</div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Password */}
                    {/* Password */}
                    <div className="relative">
                        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 text-lg">🔒</div>
                        <input
                            type="password"
                            placeholder="Password (min. 8 characters)"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Password Requirement Checklist */}
                    <ul className="mt-2 text-sm">
                        <li className={`${password.length >= 8 ? "text-green-600" : "text-gray-500"}`}>
                            At least 8 characters
                        </li>
                        <li className={`${/[A-Z]/.test(password) ? "text-green-600" : "text-gray-500"}`}>
                            One uppercase letter
                        </li>
                        <li className={`${/[a-z]/.test(password) ? "text-green-600" : "text-gray-500"}`}>
                            One lowercase letter
                        </li>
                        <li className={`${/\d/.test(password) ? "text-green-600" : "text-gray-500"}`}>
                            One number
                        </li>
                        <li className={`${/[!@#$%^&*]/.test(password) ? "text-green-600" : "text-gray-500"}`}>
                            One special character
                        </li>
                    </ul>


                    {/* Submit Button */}
                    <button
                        onClick={authHandle}
                        disabled={loading}
                        className={`w-full py-3 font-semibold rounded-lg shadow transition-all duration-200 ${loading
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-sky-600 text-white hover:bg-sky-700 transform hover:-translate-y-1 cursor-pointer'
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating Account...
                            </div>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </div>

                {/* OR Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-3 text-sm text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Social Icons - Commented out as requested */}
                {/* 
                <div className="flex flex-col gap-3 mt-2">
                    <button 
                        className="cursor-pointer flex items-center justify-center gap-3 w-full py-2 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition disabled:opacity-50"
                        disabled={loading}
                    >
                        <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 to-yellow-400 to-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">G</span>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">Continue with Google</span>
                    </button>

                    <button 
                        className="cursor-pointer flex items-center justify-center gap-3 w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                        disabled={loading}
                    >
                        <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                            <span className="text-blue-600 text-xs font-bold">f</span>
                        </div>
                        <span className="text-sm font-medium">Continue with Facebook</span>
                    </button>
                </div>
                */}

                {/* Login Redirect */}
                <p className="text-center text-gray-500 mt-8 text-sm">
                    Already have an account?{' '}
                    <a href="/login" className="text-sky-600 hover:underline font-medium">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;