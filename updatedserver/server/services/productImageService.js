// services/productImageService.js
import db from "../models/index.js";
const { ProductImage } = db;

export const createImage = async (data, transaction) => {
  if (!data.product_id) {
    throw new Error("product_id is required");
  }
  if (!data.image_url) {
    throw new Error("image_url is required");
  }

  const imageData = {
    product_id: parseInt(data.product_id, 10),
    variant_id: data.variant_id ? parseInt(data.variant_id, 10) : null,
    image_url: data.image_url,

    alt_text: data.alt_text !== undefined ? data.alt_text : null,
    is_primary: data.is_primary ?? false,
    is_active: data.is_active ?? true,
    image_type: data.image_type !== undefined ? data.image_type : null,

    image_size: data.image_size !== undefined ? parseInt(data.image_size, 10) : null,
    position: data.position !== undefined ? parseInt(data.position, 10) : 0,

    created_by: data.created_by !== undefined ? parseInt(data.created_by, 10) : null,
  };

  // Validate numeric fields
  if (isNaN(imageData.product_id)) throw new Error("Invalid product_id");
  if (imageData.variant_id !== null && isNaN(imageData.variant_id)) throw new Error("Invalid variant_id");
  if (imageData.image_size !== null && isNaN(imageData.image_size)) throw new Error("Invalid image_size");
  if (isNaN(imageData.position)) throw new Error("Invalid position");
  if (imageData.created_by !== null && isNaN(imageData.created_by)) throw new Error("Invalid created_by");

  return await ProductImage.create(imageData, { transaction });
};


// export const createImage = async (data, transaction = null) => {
//   const imageData = {
//     product_id: parseInt(data.product_id),
//     variant_id: data.variant_id ? parseInt(data.variant_id) : null,
//     image_url: data.image_url,
//     alt_text: data.alt_text || null,
//     is_primary: data.is_primary ?? false,
//     is_active: data.is_active ?? true,
//     image_type: data.image_type || null,
//     image_size: data.image_size ? parseInt(data.image_size) : null,
//     position: data.position ? parseInt(data.position) : 0,
//     created_by: data.created_by ? parseInt(data.created_by) : null,
//   };

//   return await ProductImage.create(imageData, { transaction });
// };


// get all products 
export const getImagesByProductId = async (product_id) => {
  if (!product_id || (typeof product_id !== 'string' && typeof product_id !== 'number')) {
    throw new Error('Valid product_id is required');
  }
  return await ProductImage.findAll({
    where: { product_id, is_active: true },
    order: [['position', 'ASC']],
  });
};

