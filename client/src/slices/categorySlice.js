import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5001/api";

// 🔹 Create Category
// categorySlice.js
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async ({ categoryData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/category/create-category",
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// 🔹 Get Active Categories
export const getActiveCategories = createAsyncThunk(
  "category/getActive",
  async ({ limit, offset, search } = {}, { rejectWithValue }) => {
    try {
      let url = `${API_URL}/categories/active`;
      const params = new URLSearchParams();
      if (limit) params.append("limit", limit);
      if (offset) params.append("offset", offset);
      if (search) params.append("search", search);

      if (params.toString()) url += `?${params.toString()}`;

      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 Get All Categories
export const getAllCategories = createAsyncThunk(
  "category/getAll",
  async ({ includeInactive, limit, offset } = {}, { rejectWithValue }) => {
    try {
      let url = `${API_URL}/category/all`;
      const params = new URLSearchParams();
      if (includeInactive) params.append("includeInactive", includeInactive);
      if (limit) params.append("limit", limit);
      if (offset) params.append("offset", offset);

      if (params.toString()) url += `?${params.toString()}`;

      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 Get Category by Slug
export const getCategoryBySlug = createAsyncThunk(
  "category/getBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/category/slug/${slug}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 Update Category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, categoryData, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${API_URL}/category/${id}`,
        categoryData,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 Delete Category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ id, soft = true, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const url = `${API_URL}/category/${id}${soft ? "" : "?soft=false"}`;
      const { data } = await axios.delete(url, config);
      return { id, ...data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔹 Slice
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    activeCategories: [],
    currentCategory: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Active
      .addCase(getActiveCategories.fulfilled, (state, action) => {
        state.activeCategories = action.payload;
      })
      // Get All
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // Get by Slug
      .addCase(getCategoryBySlug.fulfilled, (state, action) => {
        state.currentCategory = action.payload;
      })
      // Update
      .addCase(updateCategory.fulfilled, (state, action) => {
        const idx = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );
        if (idx !== -1) state.categories[idx] = action.payload;
      })
      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c.id !== action.payload.id
        );
      });
  },
});

export default categorySlice.reducer;
