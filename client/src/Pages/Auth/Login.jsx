import React, { useState } from 'react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-300">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email or Mobile Number</label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="example@email.com or 9876543210"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
