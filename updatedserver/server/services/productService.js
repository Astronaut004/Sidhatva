import db from "../models/index.js";
import generateSlug from "../utils/generateSlug.js";
import { customAlphabet } from "nanoid";

const { Product } = db;
const nanoid = customAlphabet("1234567890", 12);

/**
 * @param {Object} data - Product payload
 * @returns {Promise<Object>} Newly created product
 */
export const createProduct = async (data) => {

  let barcode;
  let attempts = 0;
  do {
    if (attempts > 5) {
      throw new Error("Failed to generate unique barcode after multiple attempts");
    }
    barcode = nanoid();
    attempts++;
  } while (await Product.findOne({ where: { barcode } }));

  let slug = data.slug || generateSlug(data.name);
  let slugExists;
  let slugAttempts = 0;
  do {
    if (slugAttempts > 5) {
      throw new Error("Failed to generate unique slug after multiple attempts");
    }
    slugExists = await Product.findOne({ where: { slug } });
    if (slugExists) {
      slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }
    slugAttempts++;
  } while (slugExists);


  // Parse dimensions properly
  // let dimensions = null;
  // if (data.dimensions) {
  //   if (typeof data.dimensions === 'string') {
  //     const parts = data.dimensions.split('x');
  //     if (parts.length === 3) {
  //       dimensions = {
  //         length: parseFloat(parts[0]),
  //         width: parseFloat(parts[1]),
  //         height: parseFloat(parts[2])
  //       };
  //     }
  //   } else if (typeof data.dimensions === 'object') {
  //     dimensions = data.dimensions;
  //   }
  // }
  let dimensions = null;

  if (data.dimensions && typeof data.dimensions === 'object') {
    dimensions = {
      length: parseFloat(data.dimensions.length),
      width: parseFloat(data.dimensions.width),
      height: parseFloat(data.dimensions.height)
    };
  }


  const productData = {
    barcode,
    comp_code: "SIDH001",
    sku: data.sku,
    name: data.name,
    slug,
    description: data.description || null,
    short_description: data.short_description || null,
    category_id: parseInt(data.category_id),
    sub_category_id: data.sub_category_id ? parseInt(data.sub_category_id) : null,
    brand_id: data.brand_id ? parseInt(data.brand_id) : null,
    material_id: data.material_id ? parseInt(data.material_id) : null,
    color_id: data.color_id ? parseInt(data.color_id) : null,
    type: data.type || "simple",
    status: data.status || "draft",
    is_active: data.is_active ?? true,
    visibility: data.visibility || "visible",
    featured: data.featured ?? false,
    weight: data.weight ? parseFloat(data.weight) : null,
    dimensions,
    shipping_required: data.shipping_required ?? true,
    tax_status: data.tax_status || "taxable",
    manage_stock: data.manage_stock ?? true,
    stock_status: data.stock_status || "instock",
    backorders_allowed: data.backorders_allowed ?? false,
    sold_individually: data.sold_individually ?? false,
    unit_factor: data.unit_factor ? parseFloat(data.unit_factor) : 1.0,
    unit_code: data.unit_code || "pcs",
    cost_price: parseFloat(data.cost_price),
    selling_price: parseFloat(data.selling_price),
    discount_amount: data.discount_amount ? parseFloat(data.discount_amount) : 0,
    discount_percent: data.discount_percent ? parseFloat(data.discount_percent) : 0,
    reviews_allowed: data.reviews_allowed ?? true,
    average_rating: data.average_rating ? parseFloat(data.average_rating) : 0.0,
    rating_count: data.rating_count ? parseInt(data.rating_count) : 0,
    total_sales: data.total_sales ? parseInt(data.total_sales) : 0,
    seo_title: data.seo_title || null,
    seo_description: data.seo_description || null,
    created_by: data.created_by ? parseInt(data.created_by) : null,
  };

  return await Product.create(productData);
};
