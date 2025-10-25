import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Base URL — adjust if needed
const API_URL = "http://localhost:5001/api/products";

// --------------------
// 🔹 Create Product
// --------------------
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      console.log("Creating Product with Data:", productData);
      console.log("the token: ", productData.token);
      
      const response = await axios.post(API_URL, productData, {
        headers: {
          Authorization: `Bearer ${productData.token}`,
          "Content-Type": "application/json" },
      });
      console.log("Create Product Response:", response);
      return response.data;
    } catch (error) {
      console.error("Create Product Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// --------------------
// 🔹 Get All Products (Optional for listing)
// --------------------
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// --------------------
// 🧩 Slice Definition
// --------------------
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ✅ Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload); // add new product to state
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = productSlice.actions;
export default productSlice.reducer;
