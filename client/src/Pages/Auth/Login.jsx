import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    identifier: '', // email or mobile
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { identifier, password } = formData;

    // Example validation logic
    const isMobile = /^[0-9]{10}$/.test(identifier);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    if (!isEmail && !isMobile) {
      alert('Please enter a valid email or 10-digit mobile number.');
      return;
    }

    console.log('Logging in with:', formData);
    // TODO: send to backend API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Mobile Number
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="example@email.com or 9876543210"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          >
            Login
          </button>
          
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              type="button"
              className="cursor-pointer flex items-center justify-center gap-3 w-full py-2 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition"
            >
              <FcGoogle className="text-xl" />
              <span className="text-sm text-gray-700 font-medium">Continue with Google</span>
            </button>

            <button 
              type="button"
              className="cursor-pointer flex items-center justify-center gap-3 w-full py-2 px-4 rounded-lg bg-[#1877F2] text-white hover:bg-[#166FE5] transition"
            >
              <FaFacebookF className="text-lg text-white" />
              <span className="text-sm font-medium">Continue with Facebook</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <a 
              href="/register" 
              className="text-blue-600 hover:text-blue-800 font-medium underline transition"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;