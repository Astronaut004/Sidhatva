import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"; // corrected path

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
