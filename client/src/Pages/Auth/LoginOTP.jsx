import React, { useState } from "react";
import AlertBox from "../../ui/AlertBox";

const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5001";

const LoginOTPPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!identifier.trim()) return showAlert("error", "Enter email or phone number");

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, purpose: "login" }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) return showAlert("error", data.message || "Failed to send OTP");

      setOtpSent(true);
      showAlert("success", "OTP sent successfully!");
    } catch (err) {
      console.error(err);
      setLoading(false);
      showAlert("error", "Something went wrong. Try again.");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp.trim()) return showAlert("error", "Enter OTP");

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, otp, purpose: "login", role: "user" }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) return showAlert("error", data.message || "Invalid OTP");

      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      showAlert("success", "OTP login successful!");

      // SPA navigation fallback if no router
      setTimeout(() => (window.location.href = "/dashboard"), 1000);
    } catch (err) {
      console.error(err);
      setLoading(false);
      showAlert("error", "Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      {AlertBox && <AlertBox alert={alert} setAlert={setAlert} />}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Login with OTP</h1>
          <p className="text-gray-500 mt-2">
            Enter your email or mobile number to receive a one-time password.
          </p>
        </div>

        {!otpSent ? (
          <>
            <input
              type="text"
              placeholder="Email Address or Mobile Number"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400 mb-4"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={loading}
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className={`w-full py-3 font-semibold rounded-lg shadow transition-all duration-200 ${
                loading ? "bg-gray-400 cursor-not-allowed text-white" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400 mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className={`w-full py-3 font-semibold rounded-lg shadow transition-all duration-200 ${
                loading ? "bg-gray-400 cursor-not-allowed text-white" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </>
        )}

        <p className="text-center text-gray-500 mt-8 text-sm">
          Want to login with password?{" "}
          <a href="/login" className="text-sky-600 hover:underline font-medium">
            Login
          </a>
        </p>

        <p className="text-center text-gray-500 mt-2 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-sky-600 hover:underline font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginOTPPage;
