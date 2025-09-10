import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice";
import authReducer from "../slices/authSlice";
import categoryReducer from "../slices/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});

