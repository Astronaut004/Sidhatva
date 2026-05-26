import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice";
import authReducer from "../slices/authSlice";
import categoryReducer from "../slices/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
  },
});

