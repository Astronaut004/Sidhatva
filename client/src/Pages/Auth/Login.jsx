import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5001";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------- Normal Login with Password ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // backend expects {identifier, password}
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      setLoading(false);
      console.error("Login error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  // ---------- Send OTP ----------
  const handleSendOtp = async () => {
    if (!formData.identifier) {
      alert("Please enter email or phone");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: formData.identifier, purpose: "login" }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send OTP");
        return;
      }

      alert("OTP sent successfully!");
      setOtpSent(true);
    } catch (err) {
      console.error("Send OTP error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  // ---------- Verify OTP ----------
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.identifier,
          otp,
          purpose: "login",
          role: "user",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid OTP");
        return;
      }

      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      alert("OTP login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Verify OTP error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        {/* -------- Normal Login Form -------- */}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* -------- OR Divider -------- */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* -------- OTP Login Section -------- */}
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium"
          >
            Send OTP
          </button>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* -------- Social Login (UI Only) -------- */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-3 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100">
            <FcGoogle className="text-xl" />
            <span className="text-sm text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>

          <button className="flex items-center justify-center gap-3 w-full py-2 px-4 rounded-lg bg-[#1877F2] text-white hover:bg-[#166FE5]">
            <FaFacebookF className="text-lg text-white" />
            <span className="text-sm font-medium">Continue with Facebook</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
