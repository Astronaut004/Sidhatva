import db from '../models/index.js';
const { Product, ProductCategory, Brand } = db;

export const createProduct = async (productData, userId) => {
  const newProduct = await Product.create({ ...productData, created_by: userId });
  return newProduct;
};

export const getAllProducts = async (queryOptions = {}) => {
  const query = {
    where: { is_active: true, status: 'published' },
    include: [
      { model: ProductCategory, as: 'category', attributes: ['name', 'slug'] },
      { model: Brand, as: 'brand', attributes: ['name', 'slug'] },
    ],
    limit: parseInt(queryOptions.limit, 10) || 10,
    offset: parseInt(queryOptions.offset, 10) || 0,
  };
  const products = await Product.findAll(query);
  return products;
};

export const getProductBySlug = async (slug) => {
  const product = await Product.findOne({
    where: { slug: slug, is_active: true },
    include: [{ model: ProductCategory, as: 'category' }, { model: Brand, as: 'brand' }]
  });
  if (!product) {
    const error = new Error('Product not found.');
    error.statusCode = 404;
    throw error;
  }
  return product;
};
