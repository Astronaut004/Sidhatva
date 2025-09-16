import { createImage, getImagesByProductId} from "../services/productImageService.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { upload } from "../middleware/upload.js";

export const createProductImageHandler = [
  upload.single("image"), // Multer middleware
  asyncHandler(async (req, res) => {
    const file = req.file;

    if (!file) {
      throw new ApiError(400, "Image file is required");
    }

    if (!req.body.product_id) {
      throw new ApiError(400, "product_id is required");
    }

    const parseBool = (val, defaultVal = false) => {
      if (val === undefined) return defaultVal;
      return val === "true" || val === true;
    };

    const newImage = await createImage({
      product_id: parseInt(req.body.product_id, 10),
      variant_id: req.body.variant_id ? parseInt(req.body.variant_id, 10) : null,
      image_url: `/uploads/products/${file.filename}`, // consider using env/config
      alt_text: req.body.alt_text ?? null,
      is_primary: parseBool(req.body.is_primary, false),
      is_active: parseBool(req.body.is_active, true),
      image_type: file.mimetype.split("/")[1],
      image_size: file.size,
      position: req.body.position ? parseInt(req.body.position, 10) : 0,
      created_by: req.user?.id ? parseInt(req.user.id, 10) : null,
    });

    res
      .status(201)
      .json(
        new ApiResponse(201, newImage, "Product image created successfully")
      );
  }),
];



export const getProductImageHandler = asyncHandler(async (req, res) => {
  const product_id = req.params.product_id;
  const images = await getImagesByProductId(product_id);
  res.status(200).json(new ApiResponse(200, images, "Images fetched successfully"));
});


