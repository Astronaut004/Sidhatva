// src/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5001";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("authToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

// 🔹 API calls using axios
export const loginApi = async (formData) => {
  return axios.post(`${API_BASE}/api/auth/login`, formData);
};

export const sendOtpApi = async (identifier) => {
  return axios.post(`${API_BASE}/api/auth/send-otp`, {
    identifier,
    purpose: "login",
  });
};

export const verifyOtpApi = async ({ identifier, otp }) => {
  return axios.post(`${API_BASE}/api/auth/verify-otp`, {
    identifier,
    otp,
    purpose: "login",
    role: "user",
  });
};

export const registerApi = async (payload) => {
  return axios.post(`${API_BASE}/api/auth/register`, payload);
};

export default authSlice.reducer;
