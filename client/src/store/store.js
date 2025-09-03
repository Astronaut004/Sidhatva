import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"; // go up one level into slices

// Named export (recommended)
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
