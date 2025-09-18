// src/slices/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL (adjust based on your backend server)
const API_URL = "http://localhost:5001/api/category";

// ✅ Async Thunks
export const createCategory = createAsyncThunk(
  "categories/create",
  async ({ categoryData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/create-category`, categoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchActiveCategories = createAsyncThunk(
  "categories/fetchActive",
  async ({ token, limit, offset, search }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/active`, {
        params: { limit, offset, search },
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAll",
  async ({ token, includeInactive, limit, offset }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/all`, {
        params: { includeInactive, limit, offset },
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCategoryBySlug = createAsyncThunk(
  "categories/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/slug/${slug}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, categoryData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, categoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async ({ id, token, soft = true }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`, {
        params: { soft },
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Slice
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    category: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.categories.push(action.payload.category);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create category";
      })

      // fetch active
      .addCase(fetchActiveCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })

      // fetch all
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })

      // fetch by slug
      .addCase(fetchCategoryBySlug.fulfilled, (state, action) => {
        state.category = action.payload.category;
      })

      // fetch by id
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.category = action.payload.category;
      })

      // update
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.success = action.payload.message;
        state.categories = state.categories.map((cat) =>
          cat.id === action.payload.category.id ? action.payload.category : cat
        );
      })

      // delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.success = action.payload.message;
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.meta.arg.id
        );
      });
  },
});

export const { clearMessages } = categorySlice.actions;
export default categorySlice.reducer;
