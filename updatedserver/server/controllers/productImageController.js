import { createImage, getImagesByProductId, updateImage, updatePrimaryImage, deleteImage } from "../services/productImageService.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { upload } from "../middleware/upload.js";
import { Transaction } from "sequelize";

export const createProductImageHandler = [
  upload.single("image"), // Multer middleware
  asyncHandler(async (req, res) => {
    const file = req.file;
    const MAX_SIZE = 100 * 1024;

    if (!file) {
      // throw new ApiError(400, "Image file is required");
      return res.status(400).json(new ApiResponse(400, null, "Image is required"));
    }

    if (!req.body.product_id) {
      // throw new ApiError(400, "product_id is required");
      return res.status(400).json(new ApiResponse(400, null, "prodcut_id is required"));
    }
    if (!req.body.alt_text) {
      return res.status(400).json(new ApiResponse(400, null, "alt_text is required"));
    }

    const parseBool = (val, defaultVal = false) => {
      if (val === undefined) return defaultVal;
      return val === "true" || val === true;
    };

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      // throw new ApiError(400, "Only PNG, JPEG, and WEBP images are allowed");
      return res.status(400).json(new ApiResponse(400, null, "Only PNG, JPEG, and WEBP images are allowed"));
    }

    if (file.size > MAX_SIZE) {
      throw new ApiError(400, "Image size should not exceed 100 KB");
    }


    const newImage = await createImage({
      product_id: parseInt(req.body.product_id, 10),
      variant_id: req.body.variant_id ? parseInt(req.body.variant_id, 10) : null,
      image_url: `/uploads/products/${file.filename}`, // consider using env/config
      alt_text: req.body.alt_text ?? null,
      is_primary: parseBool(req.body.is_primary, false),
      is_active: parseBool(req.body.is_active, true),
      image_type: file.mimetype.split("/")[1],
      image_size: Math.round(file.size / 1024),
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



export const updateProductImageHandler = [
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const file = req.file;
    const product_id = req.params.product_id;
    const image_id = req.params.image_id;
    const MAX_SIZE = 100 * 1024;

    if (!product_id) {
      // throw new ApiError(400, "product_id is required");
      return res.status(400).json(new ApiResponse(400, null, "product_id is required"));
    }
    if (!image_id) {
      // throw new ApiError(400, "image_id is required");
      return res.status(400).json(new ApiResponse(400, null, "image_id is required"));
    }


    // Validate file type only if file is uploaded
    if (!req.body.alt_text) {
      return res.status(400).json(new ApiResponse(400, null, "alt_text is required"));
    }


    if (!file) {
      return res.status(400).json(new ApiResponse(400, null, "Image is required"));
    }
    // if (file.size > MAX_SIZE) {
    //   return res.status(400).json(new ApiResponse(400, null, "Image 100 KB"));
    // }

    let imageData = {
      alt_text: req.body.alt_text,
      position: req.body.position,
      updated_at: new Date(),
    };


    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedTypes.includes(file.mimetype)) {
        // throw new ApiError(400, "Only PNG, JPEG, and WEBP images are allowed");
        return res.status(400).json(new ApiResponse(400, null, "Only PNG, JPEG, and WEBP images are allowed"));
      }

      imageData = {
        ...imageData, // keep alt_text & position
        image_url: `/uploads/products/${file.filename}`,
        image_type: file.mimetype.split("/")[1],
        image_size: Math.round(file.size / 1024),
      };
    }

    const updatedImage = await updateImage(product_id, image_id, imageData);
    res
      .status(200)
      .json(new ApiResponse(200, updatedImage, "Image updated successfully"));
  }),
];

export const updatePrimaryImageHandler = asyncHandler(async (req, res) => {
  const { product_id, image_id } = req.params;

  // Early validation
  if (!product_id || !image_id) {
    return res.status(400).json(new ApiResponse(400, null, "Product ID and Image ID are required"));
  }

  // Update primary image
  const updatedImage = await updatePrimaryImage(product_id, image_id);

  res.status(200).json(new ApiResponse(
    200,
    updatedImage,
    "Primary image updated successfully"
  ));
});


export const deleteProductImageHandler = asyncHandler(async (req, res) => {
  const { image_id } = req.params;
  const soft = req.query.soft !== "false"; // treat anything other than "false" as true

  if (!image_id) {
    return res.status(400).json(new ApiResponse(400, null, "Image ID is required"));
  }

  const result = await deleteImage({ image_id, soft });

  res.status(200).json(new ApiResponse(200, result, result.message));
});
