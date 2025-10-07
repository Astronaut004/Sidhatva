import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, resetStatus } from "../../slices/productSlice";

function ProductCreate() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.product);

  const [categoryType, setCategoryType] = useState("");
  const [form, setForm] = useState({
    product: {
      name: "",
      sku: "",
      category_id: "",
      cost_price: "",
      selling_price: "",
      created_by: 1,
      images: { gallery: [] },
    },
    image: {
      image_url: "",
      alt_text: "",
    },
    Electronics: {},
    furniture: {},
    HomeDecor: {},
  });

  // --- Handle basic product field ---
  const handleProductChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      product: { ...prev.product, [field]: value },
    }));
  };

  // --- Handle image field ---
  const handleImageChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      image: { ...prev.image, [field]: value },
    }));
  };

  // --- Handle nested category fields ---
  const handleCategoryChange = (category, path, value) => {
    setForm((prev) => {
      const updated = { ...(prev[category] || {}) };
      let temp = updated;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        temp[key] = temp[key] || {};
        temp = temp[key];
      }
      temp[path[path.length - 1]] = value;
      return { ...prev, [category]: updated };
    });
  };

  // --- Submit form ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      product: form.product,
      image: form.image,
      ...(categoryType && { [categoryType]: form[categoryType] }),
    };
    dispatch(createProduct(payload));
  };

  // --- Reset status on success/error ---
  useEffect(() => {
    if (success) {
      alert("✅ Product created successfully!");
      dispatch(resetStatus());
    }
    if (error) {
      alert("❌ " + error);
    }
  }, [success, error]);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 rounded w-full"
            value={form.product.name}
            onChange={(e) => handleProductChange("name", e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="SKU"
            className="border p-2 rounded w-full"
            value={form.product.sku}
            onChange={(e) => handleProductChange("sku", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Category ID"
            className="border p-2 rounded w-full"
            value={form.product.category_id}
            onChange={(e) => handleProductChange("category_id", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Cost Price"
            className="border p-2 rounded w-full"
            value={form.product.cost_price}
            onChange={(e) => handleProductChange("cost_price", e.target.value)}
          />
          <input
            type="number"
            placeholder="Selling Price"
            className="border p-2 rounded w-full"
            value={form.product.selling_price}
            onChange={(e) =>
              handleProductChange("selling_price", e.target.value)
            }
          />
        </div>

        {/* Image Info */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Main Image URL"
            className="border p-2 rounded w-full"
            value={form.image.image_url}
            onChange={(e) => handleImageChange("image_url", e.target.value)}
          />
          <input
            type="text"
            placeholder="Alt Text"
            className="border p-2 rounded w-full"
            value={form.image.alt_text}
            onChange={(e) => handleImageChange("alt_text", e.target.value)}
          />
        </div>

        {/* Category Type Dropdown */}
        <select
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Category Type</option>
          <option value="Electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="HomeDecor">Home Decor</option>
        </select>

        {/* Conditional Fields */}
        {categoryType === "Electronics" && (
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Electronics Details</h3>
            <input
              type="text"
              placeholder="Heading"
              className="border p-2 rounded w-full mb-2"
              onChange={(e) =>
                handleCategoryChange("Electronics", ["electronicProduct", "heading"], e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Voltage"
              className="border p-2 rounded w-full mb-2"
              onChange={(e) =>
                handleCategoryChange("Electronics", ["electronicProduct", "electric_data", "voltage"], e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Power"
              className="border p-2 rounded w-full mb-2"
              onChange={(e) =>
                handleCategoryChange("Electronics", ["electronicProduct", "electric_data", "power"], e.target.value)
              }
            />
          </div>
        )}

        {categoryType === "furniture" && (
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Furniture Dimensions</h3>
            {["length", "width", "height", "weight"].map((key) => (
              <input
                key={key}
                type="number"
                placeholder={key.toUpperCase()}
                className="border p-2 rounded w-full mb-2"
                onChange={(e) =>
                  handleCategoryChange("furniture", [key], e.target.value)
                }
              />
            ))}
          </div>
        )}

        {categoryType === "HomeDecor" && (
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Home Decor Details</h3>
            <textarea
              placeholder="Details"
              className="border p-2 rounded w-full mb-2"
              onChange={(e) =>
                handleCategoryChange("HomeDecor", ["details"], e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Material"
              className="border p-2 rounded w-full mb-2"
              onChange={(e) =>
                handleCategoryChange("HomeDecor", ["specification", "material"], e.target.value)
              }
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductCreate;
