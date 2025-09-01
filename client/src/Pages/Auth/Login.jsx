import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

// If your component file is Pages/Auth/LoginOTPPage.jsx


const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5001";

const LoginPage = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) return alert(data.message || "Login failed");

      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        {/* Normal Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Email or Mobile Number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Social Login */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-3 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100">
            <FcGoogle className="text-xl" /> Continue with Google
          </button>
          <button className="flex items-center justify-center gap-3 w-full py-2 px-4 rounded-lg bg-[#1877F2] text-white hover:bg-[#166FE5]">
            <FaFacebookF className="text-lg text-white" /> Continue with Facebook
          </button>
        </div>

        {/* Bottom Links */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Sign up
          </a>{" "}
          |{" "}
          <a
            href="/LoginOTP"
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Login with OTP
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
