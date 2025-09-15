// services/productImageService.js
import db from "../models/index.js";
const { ProductImage } = db;

// export const createImage = async (data, transaction = null) => {
//   if (data.is_primary) {
//     await ProductImage.update(
//       { is_primary: false },
//       {
//         where: {
//           product_id: data.product_id,
//           ...(data.variant_id ? { variant_id: data.variant_id } : {}),
//         },
//         transaction,
//       }
//     );
//   }

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


// services/productImageService.js
export const createImage = async (data, transaction = null) => {
  const imageData = {
    product_id: parseInt(data.product_id),
    variant_id: data.variant_id ? parseInt(data.variant_id) : null,
    image_url: data.image_url,
    alt_text: data.alt_text || null,
    is_primary: data.is_primary ?? false,
    is_active: data.is_active ?? true,
    image_type: data.image_type || null,
    image_size: data.image_size ? parseInt(data.image_size) : null,
    position: data.position ? parseInt(data.position) : 0,
    created_by: data.created_by ? parseInt(data.created_by) : null,
  };

  return await ProductImage.create(imageData, { transaction });
};
