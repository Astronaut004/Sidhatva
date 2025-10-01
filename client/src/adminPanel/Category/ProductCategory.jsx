import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../slices/categoryslice";
import { Link } from "react-router-dom"; // ✅ import Link

const CategoryCreateForm = () => {
const CreateCategory = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.category);
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    seo_title: "",
    is_active: true,
  });

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.categories);
  const { token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const categoryData = {
    name: formData.name,
    description: formData.description,
    seo_title: formData.seo_title || 
      formData.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
    is_active: formData.is_active,
  };

  dispatch(createCategory({ categoryData, token }));
};




  return (
    <div className="p-6 max-w-lg mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Create Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* SEO Title */}
        <div>
          <label className="block mb-1">SEO Title</label>
          <input
            type="text"
            name="seo_title"
            value={formData.seo_title}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Active */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Active</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>

      {error && (
  <p className="text-red-500 mt-2">
    {typeof error === "string" ? error : error.message || "Something went wrong"}
  </p>
)}


      {/* ✅ Navigation Buttons */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-center space-x-3">
          <Link
            to="/admin"
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors hover:cursor-pointer"
          >
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Link>

          <Link
            to="/Show-Categories"
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors hover:cursor-pointer"
          >
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            View Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
