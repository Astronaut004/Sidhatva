import { body } from 'express-validator';

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("Product name is required")
    .isLength({ max: 255 }).withMessage("Name cannot exceed 255 characters"),

  body("sku")
    .trim()
    .notEmpty().withMessage("SKU is required")
    .isLength({ max: 100 }).withMessage("SKU cannot exceed 100 characters"),

  body("category_id")
    .notEmpty().withMessage("Category is required")
    .isInt().withMessage("Category ID must be an integer"),

  // ✅ Optional but validated fields
  body("sub_category_id")
    .optional({ nullable: true })
    .custom((value) => value === null || Number.isInteger(value))
    .withMessage("Sub-category ID must be an integer or null"),
  body("brand_id")
    .optional({ nullable: true })
    .custom((value) => value === null || Number.isInteger(value))
    .isInt().withMessage("Brand ID must be an integer"),

  body("material_id")
    .optional({ nullable: true })
    .custom((value) => value === null || Number.isInteger(value))
    .isInt().withMessage("Material ID must be an integer"),

  body("color_id")
    .optional({ nullable: true })
    .custom((value) => value === null || Number.isInteger(value))
    .isInt().withMessage("Color ID must be an integer"),

  // ✅ Enums
  body("type")
    .optional()
    .isIn(["simple", "variable", "grouped", "external"])
    .withMessage("Invalid product type"),

  body("status")
    .optional()
    .isIn(["draft", "published", "archived"])
    .withMessage("Invalid status"),
  body("is_active")
    .optional()
    .isBoolean().withMessage("is_active must be true or false")
    .toBoolean()
    .customSanitizer((value) => value ?? true),
  body("visibility")
    .optional()
    .isIn(["visible", "hidden", "catalog", "search"])
    .withMessage("Invalid visibility"),

  // ✅ Numbers
  body("weight")
    .optional()
    .isFloat({ min: 0 }).withMessage("Weight must be a positive number"),
  // ✅ JSON: dimensions
  body("dimensions")
    .optional()
    .custom((value) => {
      if (typeof value !== "object") {
        throw new Error("Dimensions must be an object");
      }
      const { length, width, height } = value;
      if (
        isNaN(parseFloat(length)) ||
        isNaN(parseFloat(width)) ||
        isNaN(parseFloat(height))
      ) {
        throw new Error("Dimensions must have numeric length, width, and height");
      }
      return true;
    }),

  body("featured")
    .optional()
    .isBoolean().withMessage("Featured must be true or false")
    .toBoolean() // converts "true"/"false" strings to boolean
    .customSanitizer((value) => value ?? false), // default to false if undefined
  body("shipping_required")
    .optional()
    .isBoolean().withMessage("Shipping required must be true or false")
    .toBoolean()
    .customSanitizer((value) => value ?? false),

  body("tax_status")
    .optional()
    .isIn(["taxable", "shipping", "none"])
    .withMessage("Invalid tax status"),
  body("manage_stock")
    .optional()
    .isBoolean().withMessage("manage stock is required must be true or false")
    .toBoolean()
    .customSanitizer((value) => value ?? false),

  body("stock_status")
    .optional()
    .isIn(["instock", "outofstock", "onbackorder"])
    .withMessage("Invalid stock status"),

  body("backorders_allowed")
    .optional()
    .isBoolean().withMessage("Backorders is required must be true or false")
    .toBoolean()
    .customSanitizer((value) => value ?? false),
  body("sold_individually")
    .optional()
    .isBoolean().withMessage("Sold individually is required must be true or false")
    .toBoolean()
    .customSanitizer((value) => value ?? false),

  body("unit_factor")
    .optional()
    .isFloat({ min: 0 }).withMessage("Unit factor must be a positive number"),

  body("unit_code")
    .optional()
    .isString().withMessage("Unit code must be a string")
    .isLength({ max: 20 }).withMessage("Unit code cannot exceed 20 characters")
    .customSanitizer((value) => value || "pcs"),

  body("cost_price")
    .notEmpty().withMessage("Cost price is required")
    .isFloat({ min: 0 }).withMessage("Cost price must be a positive number"),

  body("selling_price")
    .notEmpty().withMessage("Selling price is required")
    .isFloat({ min: 0 }).withMessage("Selling price must be a positive number"),

  body("discount_amount")
    .optional()
    .isFloat({ min: 0 }).withMessage("Discount amount must be a positive number"),

  body("discount_percent")
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage("Discount percent must be between 0 and 100"),
  body("reviews_allowed")
    .optional()
    .isBoolean().withMessage("reviews_allowed must be true or false")
    .toBoolean() // converts "true"/"false" strings to boolean
    .customSanitizer((value) => value ?? true),
  body("average_rating")
    .optional()
    .isFloat({ min: 0, max: 5 }).withMessage("Average rating must be between 0 and 5"),

  body("rating_count")
    .optional()
    .isInt({ min: 0 }).withMessage("Rating count must be a non-negative integer"),

  body("total_sales")
    .optional()
    .isInt({ min: 0 }).withMessage("Total sales must be a non-negative integer"),

  // ✅ Strings
  body("seo_title")
    .optional()
    .isLength({ max: 200 }).withMessage("SEO title cannot exceed 200 characters"),

  body("seo_description")
    .optional()
    .isString().withMessage("SEO description must be a string"),


];
