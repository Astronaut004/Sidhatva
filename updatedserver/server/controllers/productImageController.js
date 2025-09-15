import { createImage } from "../services/productImageService.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { upload } from "../middleware/upload.js";

export const createProductImageHandler = [
  upload.single("image"), // <--- Multer middleware
  asyncHandler(async (req, res) => {
    const file = req.file;

    const newImage = await createImage({
      product_id: parseInt(req.body.product_id),
      variant_id: req.body.variant_id ? parseInt(req.body.variant_id) : null,
      image_url: `/uploads/products/${file.filename}`, // fix here
      alt_text: req.body.alt_text || null,
      is_primary: req.body.is_primary === "true",
      is_active: req.body.is_active !== "false",
      image_type: file.mimetype.split("/")[1],
      image_size: file.size,
      position: req.body.position ? parseInt(req.body.position) : 0,
      created_by: req.user?.id ? parseInt(req.user.id) : null,
    });

    res
      .status(201)
      .json(
        new ApiResponse(201, newImage, "Product image created successfully")
      );
  }),
];
