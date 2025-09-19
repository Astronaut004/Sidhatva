import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../../slices/categoryslice";
import { Link } from "react-router-dom"; // ✅ FIXED: Import Link

const ShowAllCategory = () => {
  const dispatch = useDispatch();
  const { categories = [], loading, error } = useSelector(
    (state) => state.category
  );
  const { token } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllCategories({ includeInactive: true }));
  }, [dispatch]);

  // ✅ Toggle active status
  const handleToggle = (cat) => {
    dispatch(
      updateCategory({
        id: cat.id,
        categoryData: { ...cat, is_active: !cat.is_active },
        token,
      })
    );
  };

  // ✅ Delete category
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory({ id, soft: true, token }));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header with Add New Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Categories</h2>

        <Link
          to="/productCategory"
          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:ring-offset-2 transition-colors text-sm hover:cursor-pointer"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={() => dispatch(getAllCategories({ search }))}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Active</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="p-2 border">{cat.id}</td>
                  <td className="p-2 border">{cat.name}</td>
                  <td className="p-2 border">
                    {cat.is_active ? "✅" : "❌"}
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleToggle(cat)}
                      className="bg-yellow-500 text-white px-2 rounded"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowAllCategory;
