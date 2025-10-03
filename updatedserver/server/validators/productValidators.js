import { body } from 'express-validator';

export const createProductValidator = [
  body("product.name")
    .trim()
    .notEmpty().withMessage("Product name is required")
    .isLength({ max: 255 }).withMessage("Name cannot exceed 255 characters"),

  body("product.sku")
    .trim()
    .notEmpty().withMessage("SKU is required")
    .isLength({ max: 100 }).withMessage("SKU cannot exceed 100 characters"),

  body("product.category_id")
    .notEmpty().withMessage("Category is required")
    .isInt().withMessage("Category ID must be an integer"),

  // ✅ Optional but validated fields
  body("product.sub_category_id")
    .optional({ nullable: true })
    .custom((value) => value === null || Number.isInteger(value))
    .withMessage("Sub-category ID must be an integer or null"),
  body("product.brand_id")
    .optional({ nullable: true })
    .custom((value) => value === null || Number.isInteger(value))
    .isInt().withMessage("Brand ID must be an integer"),

  body("product.material_id")
    .optional({ nullable: true })
    .custom((value) => value === null || Number.isInteger(value))
    .isInt().withMessage("Material ID must be an integer"),

  body("product.color_id")
    .optional({ nullable: true })
    .custom((value) => value === null || Number.isInteger(value))
    .isInt().withMessage("Color ID must be an integer"),

  // ✅ Enums
  body("product.type")
    .optional()
    .isIn(["simple", "variable", "grouped", "external"])
    .withMessage("Invalid product type"),

  body("product.status")
    .optional()
    .isIn(["draft", "published", "archived"])
    .withMessage("Invalid status"),
  body("product.is_active")
    .optional()
    .isBoolean().withMessage("is_active must be true or false")
    .toBoolean()
    .customSanitizer((value) => value ?? true),
  body("product.visibility")
    .optional()
    .isIn(["visible", "hidden", "catalog", "search"])
    .withMessage("Invalid visibility"),
  body("product.featured")
    .optional()
    .isBoolean().withMessage("Featured must be true or false")
    .toBoolean() // converts "true"/"false" strings to boolean
    .customSanitizer((value) => value ?? false), // default to false if undefined
  body("product.shipping_required")
    .optional()
    .isBoolean().withMessage("Shipping required must be true or false")
    .toBoolean()
    .customSanitizer((value) => value ?? false),

  body("product.tax_status")
    .optional()
    .isIn(["taxable", "shipping", "none"])
    .withMessage("Invalid tax status"),
  body("product.manage_stock")
    .optional()
    .isBoolean().withMessage("manage stock is required must be true or false")
    .toBoolean()
    .customSanitizer((value) => value ?? false),

  body("product.stock_status")
    .optional()
    .isIn(["instock", "outofstock", "onbackorder"])
    .withMessage("Invalid stock status"),

  body("product.backorders_allowed")
    .optional()
    .isBoolean().withMessage("Backorders is required must be true or false")
    .toBoolean()
    .customSanitizer((value) => value ?? false),
  body("product.sold_individually")
    .optional()
    .isBoolean().withMessage("Sold individually is required must be true or false")
    .toBoolean()
    .customSanitizer((value) => value ?? false),

  body("product.unit_factor")
    .optional()
    .isFloat({ min: 0 }).withMessage("Unit factor must be a positive number"),

  body("product.unit_code")
    .optional()
    .isString().withMessage("Unit code must be a string")
    .isLength({ max: 20 }).withMessage("Unit code cannot exceed 20 characters")
    .customSanitizer((value) => value || "pcs"),

  body("product.cost_price")
    .notEmpty().withMessage("Cost price is required")
    .isFloat({ min: 0 }).withMessage("Cost price must be a positive number"),

  body("product.selling_price")
    .notEmpty().withMessage("Selling price is required")
    .isFloat({ min: 0 }).withMessage("Selling price must be a positive number"),

  body("product.discount_amount")
    .optional()
    .isFloat({ min: 0 }).withMessage("Discount amount must be a positive number"),

  body("product.discount_percent")
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage("Discount percent must be between 0 and 100"),
  body("product.reviews_allowed")
    .optional()
    .isBoolean().withMessage("reviews_allowed must be true or false")
    .toBoolean() // converts "true"/"false" strings to boolean
    .customSanitizer((value) => value ?? true),
  body("product.average_rating")
    .optional()
    .isFloat({ min: 0, max: 5 }).withMessage("Average rating must be between 0 and 5"),

  body("product.rating_count")
    .optional()
    .isInt({ min: 0 }).withMessage("Rating count must be a non-negative integer"),

  body("product.total_sales")
    .optional()
    .isInt({ min: 0 }).withMessage("Total sales must be a non-negative integer"),

  // ✅ Strings
  body("product.seo_title")
    .optional()
    .isLength({ max: 200 }).withMessage("SEO title cannot exceed 200 characters"),

  body("product.seo_description")
    .optional()
    .isString().withMessage("SEO description must be a string"),
  body("product.excerpt")
    .optional()
    .isString().withMessage("excerpt must be string"),
  body("product.upsell_ids")
    .optional()
    .isArray({ min: 0 }).withMessage("upsell_ids must be an array"),
  body("product.crosssell_ids")
    .optional()
    .isArray({ min: 0 }).withMessage("crosssell_ids must be an array"),
  body("product.purchase_note")
    .optional()
    .isString().withMessage("purchase_note must be string"),
  body("product.post_content")
    .optional()
    .isString().withMessage("Post Content must be string"),
  body("product.images")
    .notEmpty().withMessage("Images is required")
    .isObject().withMessage("Images must be a JSON object"),
  body("product.created_by")
      .notEmpty().withMessage("login to create")
      .isInt().withMessage("login to create"),
// image → active image in ProductImage table

  body("image")
    .notEmpty().withMessage("Image is required")
    .isString().withMessage("Image must be a string"),
  // Furniture (only if it exists)
body("furniture")
  .optional()
  .custom((value) => {
    if (!value) return true; // skip if null/undefined
    if (!value.heading) throw new Error("Furniture heading is required");
    if (value.dimensions) {
      if (value.dimensions.length <= 0) throw new Error("Length must be positive");
      if (value.dimensions.width <= 0) throw new Error("Width must be positive");
      if (value.dimensions.height <= 0) throw new Error("Height must be positive");
    }
    return true;
  }),

// Electronics (only if it exists)
body("Electronics")
  .optional()
  .custom((value) => {
    if (!value) return true;
    if (!value.electronicProduct?.heading)
      throw new Error("Electronics product heading is required");
    if (!value.electronicTechnicalData?.power)
      throw new Error("Electronics power is required");
    return true;
  }),

// HomeDecor (only if it exists)
body("HomeDecor")
  .optional()
  .custom((value) => {
    if (!value) return true;
    if (!value.details) throw new Error("HomeDecor details are required");
    return true;
  }),

];

