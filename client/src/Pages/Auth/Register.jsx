import React, { useState } from "react";
import AlertBox from "../../ui/AlertBox";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../slices/authSlice";


const Register = () => {
  const [identifier, setIdentifier] = useState(""); // Single field for email/phone
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
  };

  const authHandle = async (e) => {
    e.preventDefault();

    if (!identifier) {
      showAlert("error", "Please enter email or phone number");
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isPhone = /^(\d{10}|\d{12,13})$/.test(identifier); // 10 or 12-13 digits

    if (!isEmail && !isPhone) {
      showAlert("error", "Please enter a valid email or phone number");
      return;
    }

    // ✅ Password Validation
    if (password.length < 8) {
      showAlert("error", "Password must be at least 8 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      showAlert("error", "Password must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      showAlert("error", "Password must contain at least one lowercase letter");
      return;
    }
    if (!/[0-9]/.test(password)) {
      showAlert("error", "Password must contain at least one number");
      return;
    }
    if (!/[@$!%*?&]/.test(password)) {
      showAlert("error", "Password must contain at least one special character (@$!%*?&)");
      return;
    }

    const payload = { identifier, password };

    try {
      setLoading(true);
      const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5001";
      console.log("API_BASE:", API_BASE);
      console.log("Payload being sent:", payload);

      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        showAlert("error", data.message || "Registration failed");
        return;
      }
      dispatch(
        loginSuccess({ user: data.data.user, token: data.data.token })
      );

      showAlert("success", "🎉 Registration successful!");
      setTimeout(() => {
        window.location.href = "/dashboard";   
      }, 2000);

    } catch (err) {
      console.error("Register error:", err);
      showAlert("error", "Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <AlertBox alert={alert} setAlert={setAlert} />

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
          <p className="text-gray-500 mt-2">
            Join us and start exploring premium products.
          </p>
        </div>

        <form onSubmit={authHandle} className="space-y-5">
          <input
            type="text"
            placeholder="Email Address or Mobile Number"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg shadow transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-sky-600 text-white hover:bg-sky-700"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-sky-600 hover:underline font-medium">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
