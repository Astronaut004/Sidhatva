import db from "../models/index.js";
import generateSlug from "../utils/generateSlug.js"; // adjust path if needed
import { customAlphabet } from "nanoid";

const { Product } = db;

// numeric barcode generator (12 digits)
const nanoid = customAlphabet("1234567890", 12);

/**
 * Create a new product
 * @param {Object} data - Product payload
 * @returns {Promise<Object>} Newly created product
 */
export const createProduct = async (data) => {
  
  const barcode = data.barcode || nanoid();

  // 🔹 Auto-generate slug from name if not provided
  let slug = data.slug || generateSlug(data.name);
  // ensure uniqueness by appending random suffix
  slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;

  return await Product.create({
    barcode,
    comp_code: data.comp_code,
    sku: data.sku,
    name: data.name,
    slug,
    description: data.description,
    short_description: data.short_description,
    category_id: data.category_id,
    sub_category_id: data.sub_category_id || null,
    brand_id: data.brand_id || null,
    material_id: data.material_id || null,
    color_id: data.color_id || null,
    type: data.type || "simple",
    status: data.status || "draft",
    is_active: data.is_active ?? true,
    visibility: data.visibility || "visible",
    featured: data.featured ?? false,
    weight: data.weight,
    dimensions: data.dimensions || null,
    shipping_required: data.shipping_required ?? true,
    tax_status: data.tax_status || "taxable",
    manage_stock: data.manage_stock ?? true,
    stock_status: data.stock_status || "instock",
    backorders_allowed: data.backorders_allowed ?? false,
    sold_individually: data.sold_individually ?? false,
    unit_factor: data.unit_factor || 1.0,
    unit_code: data.unit_code || "pcs",
    cost_price: data.cost_price,
    selling_price: data.selling_price,
    discount_amount: data.discount_amount || 0,
    discount_percent: data.discount_percent || 0,
    reviews_allowed: data.reviews_allowed ?? true,
    average_rating: data.average_rating || 0.0,
    rating_count: data.rating_count || 0,
    total_sales: data.total_sales || 0,
    seo_title: data.seo_title,
    seo_description: data.seo_description,
    created_by: data.created_by,
  });
};
