import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, clearMessages } from "../../slices/productSlice";

const ProductCreate = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // your auth token
  const { loading, error, successMessage } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    short_description: "",
    category_id: "",
    cost_price: "",
    selling_price: "",
    dimensions: { length: "", width: "", height: "" },
    created_by: 14,
    type: "simple",
    status: "draft",
    is_active: true,
    visibility: "visible",
    featured: false,
    shipping_required: true,
    tax_status: "taxable",
    manage_stock: true,
    stock_status: "instock",
    backorders_allowed: false,
    sold_individually: false,
    unit_factor: 1,
    unit_code: "pcs",
    discount_amount: 0,
    discount_percent: 0,
    reviews_allowed: true,
    seo_title: "",
    seo_description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dimensions: { ...formData.dimensions, [name]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ productData: formData, token }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">➕ Create Product</h2>

      {loading && <p className="text-blue-600">Submitting...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* SKU */}
        <div>
          <label>SKU *</label>
          <input name="sku" value={formData.sku} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>

        {/* Name */}
        <div>
          <label>Name *</label>
          <input name="name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Category ID */}
        <div>
          <label>Category ID *</label>
          <input type="number" name="category_id" value={formData.category_id} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>

        {/* Cost & Selling Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Cost Price *</label>
            <input type="number" name="cost_price" value={formData.cost_price} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label>Selling Price *</label>
            <input type="number" name="selling_price" value={formData.selling_price} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
        </div>

        {/* Dimensions */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label>Length</label>
            <input type="number" name="length" value={formData.dimensions.length} onChange={handleDimensionChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label>Width</label>
            <input type="number" name="width" value={formData.dimensions.width} onChange={handleDimensionChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label>Height</label>
            <input type="number" name="height" value={formData.dimensions.height} onChange={handleDimensionChange} className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
