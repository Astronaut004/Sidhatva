// src/adminPanel/Category/ProductCategory.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, clearMessages } from "../../slices/categorySlice.js";
import { Link } from "react-router-dom";

const CategoryCreateForm = ({ token }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    seoTitle: "",
    isActive: true,
  });

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.categories);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  // Convert formData to snake_case for backend
  const payload = {
    name: formData.name,
    description: formData.description,
    seo_title: formData.seoTitle,
    is_active: formData.isActive,
  };

  dispatch(createCategory({ categoryData: payload, token }));
};





  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Create Category
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Name *
          </label>
          <input
            name="name"
            placeholder="Enter category name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* SEO Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            SEO Title
          </label>
          <input
            name="seoTitle"
            placeholder="Enter SEO title"
            value={formData.seoTitle}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Active Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 block text-sm text-gray-700">Is Active</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>

      {/* Messages */}
      {success && <p className="text-green-600 mt-4">{success}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* Navigation Buttons */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-center space-x-3">
          <Link
            to="/admin"
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/Show-Categories"
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            View Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreateForm;
