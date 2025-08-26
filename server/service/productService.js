import { Product, ProductCategory, Brand } from '../models';
import { Op } from 'sequelize';

/**
 * Creates a new product in the database.
 * @param {object} productData - The data for the new product.
 * @param {number} userId - The ID of the user creating the product.
 * @returns {Promise<object>} The created product object.
 */
export const createProduct = async (productData, userId) => {
  // You can add more complex logic here, like checking if the SKU already exists.
  const newProduct = await Product.create({
    ...productData,
    created_by: userId, // Associate the product with the user who created it
  });
  return newProduct;
};

/**
 * Retrieves a list of all products with filtering, sorting, and pagination.
 * @param {object} queryOptions - Options for filtering, sorting, etc.
 * @returns {Promise<Array>} An array of product objects.
 */
export const getAllProducts = async (queryOptions = {}) => {
  // We'll build a query based on the options provided.
  const query = {
    where: {
      is_active: true,
      status: 'published',
    },
    include: [
      { model: ProductCategory, as: 'category', attributes: ['name', 'slug'] },
      { model: Brand, as: 'brand', attributes: ['name', 'slug'] },
    ],
    // Add defaults for pagination
    limit: parseInt(queryOptions.limit, 10) || 10,
    offset: parseInt(queryOptions.offset, 10) || 0,
  };

  const products = await Product.findAll(query);
  return products;
};

/**
 * Finds a single product by its unique slug.
 * @param {string} slug - The slug of the product to find.
 * @returns {Promise<object|null>} The product object or null if not found.
 */
export const getProductBySlug = async (slug) => {
  const product = await Product.findOne({
    where: { slug, is_active: true },
    include: [
      { model: ProductCategory, as: 'category' },
      { model: Brand, as: 'brand' },
      // We can add includes for variants and images here later
    ],
  });

  if (!product) {
    const error = new Error('Product not found.');
    error.statusCode = 404; // Not Found
    throw error;
  }
  return product;
};
