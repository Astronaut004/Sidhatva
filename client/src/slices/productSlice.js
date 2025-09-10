import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 Async thunk for creating product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ productData, token }, { rejectWithValue }) => {
    try {
      // Convert some fields to numbers (backend may reject string values)
      const payload = {
        ...productData,
        category_id: Number(productData.category_id),
        cost_price: Number(productData.cost_price),
        selling_price: Number(productData.selling_price),
        dimensions: {
          length: Number(productData.dimensions.length) || 0,
          width: Number(productData.dimensions.width) || 0,
          height: Number(productData.dimensions.height) || 0,
        },
      };

      const res = await fetch("http://localhost:5001/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "❌ Failed to create product");
      }

      return data; // return success response
    } catch (err) {
      return rejectWithValue("⚠️ Server error. Try again.");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "✅ Product created successfully!";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "❌ Something went wrong";
      });
  },
});

export const { clearMessages } = productSlice.actions;
export default productSlice.reducer;
