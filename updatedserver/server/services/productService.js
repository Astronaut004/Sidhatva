import db from "../models/index.js";
import generateSlug from "../utils/generateSlug.js";
import { customAlphabet } from "nanoid";

const { Product, ProductImage, FurnitureProduct, ElectronicsProduct, ElectronicsCharacteristics, ElectronicsTechnicalData, HomeDecorProduct } = db;
const nanoid = customAlphabet("1234567890", 12);



export const createProduct = async (payload, transaction) => {
  const { product, furniture, Electronics, HomeDecor, image } = payload;
  let barcode;
  let attempts = 0;
  do {
    if (attempts > 5) {
      throw new Error("Failed to generate unique barcode after multiple attempts");
    }
    barcode = nanoid();
    attempts++;
  } while (await Product.findOne({ where: { barcode } }));

  let slug = generateSlug(product.name);
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
  const comp_code = "SIDH001";
  // 1. Insert product
  const newProduct = await Product.create(
    {
      ...product,
      barcode,
      slug,
      comp_code
    },
    { transaction }
  );
  let pr = 0;
  if (Electronics && Object.keys(Electronics).length > 0) pr += 1;
  if (furniture && Object.keys(furniture).length > 0) pr += 1;
  if (HomeDecor && Object.keys(HomeDecor).length > 0) pr += 1;

  if (pr !== 1) {
    throw new Error("Only one of Electronics, Furniture, or HomeDecor can be provided");
  }

  if (Electronics) {
    let eleProduct = null;
    const { electronicProduct, electronicCharacterstics, electronicTechnicalData } = Electronics;
    if (electronicProduct) {
      eleProduct = await ElectronicsProduct.create(
        { ...electronicProduct, product_id: newProduct.id },
        { transaction }
      );
    }
    if (electronicCharacterstics && eleProduct) {
      await ElectronicsCharacteristics.create(
        { ...electronicCharacterstics, electronics_id: eleProduct.id },
        { transaction }
      );
    }

    if (electronicTechnicalData && eleProduct) {
      await ElectronicsTechnicalData.create(
        { ...electronicTechnicalData, electronics_id: eleProduct.id },
        { transaction }
      );
    }
  }

  if (HomeDecor) {
    await HomeDecorProduct.create(
      { ...HomeDecor, product_id: newProduct.id },
      { transaction }
    );
  }
  // 2. Insert furniture if exists
  if (furniture) {
    await FurnitureProduct.create(
      { ...furniture, product_id: newProduct.id },
      { transaction }
    );
  }

  // 3. Insert images if exists
  if (image) {
    const existingActive = await ProductImage.findOne({
      where: { product_id: newProduct.id, is_active: true },
      transaction,
    });

    if (existingActive) {
      // update existing active image
      await existingActive.update(
        { ...image, is_active: true },
        { transaction }
      );
    } else {
      // create new active image
      await ProductImage.create(
        { ...image, product_id: newProduct.id, is_active: true },
        { transaction }
      );
    }
  }
  const fullProduct = await Product.findOne({
    where: { id: newProduct.id },
    include: [
      {
        model: FurnitureProduct,
        as: "FurnitureProduct",
      },
      {
        model: ElectronicsProduct,
        as: "ElectronicsProduct",
        include: [
          { model: ElectronicsCharacteristics, as: "Characteristics" },
          { model: ElectronicsTechnicalData, as: "TechnicalData" },
        ],
      },
      {
        model: HomeDecorProduct,
        as: "HomeDecorProduct",
      },
      {
        model: ProductImage,
        as: "product_images",
        where: { is_active: true },
        required: false,
      },
    ],
    transaction,
  });


  return fullProduct;
};


/**
 * @param {Object} data - Product payload
 * @returns {Promise<Object>} Newly created product
 */
// export const createProduct = async (data) => {



//   let dimensions = null;

//   if (data.dimensions && typeof data.dimensions === 'object') {
//     dimensions = {
//       length: parseFloat(data.dimensions.length),
//       width: parseFloat(data.dimensions.width),
//       height: parseFloat(data.dimensions.height)
//     };
//   }


//   const productData = {
//     barcode,
//     comp_code: "SIDH001",
//     sku: data.sku,
//     name: data.name,
//     slug,
//     description: data.description || null,
//     short_description: data.short_description || null,
//     category_id: parseInt(data.category_id),
//     sub_category_id: data.sub_category_id ? parseInt(data.sub_category_id) : null,
//     brand_id: data.brand_id ? parseInt(data.brand_id) : null,
//     material_id: data.material_id ? parseInt(data.material_id) : null,
//     color_id: data.color_id ? parseInt(data.color_id) : null,
//     type: data.type || "simple",
//     status: data.status || "draft",
//     is_active: data.is_active ?? true,
//     visibility: data.visibility || "visible",
//     featured: data.featured ?? false,
//     weight: data.weight ? parseFloat(data.weight) : null,
//     dimensions,
//     shipping_required: data.shipping_required ?? true,
//     tax_status: data.tax_status || "taxable",
//     manage_stock: data.manage_stock ?? true,
//     stock_status: data.stock_status || "instock",
//     backorders_allowed: data.backorders_allowed ?? false,
//     sold_individually: data.sold_individually ?? false,
//     unit_factor: data.unit_factor ? parseFloat(data.unit_factor) : 1.0,
//     unit_code: data.unit_code || "pcs",
//     cost_price: parseFloat(data.cost_price),
//     selling_price: parseFloat(data.selling_price),
//     discount_amount: data.discount_amount ? parseFloat(data.discount_amount) : 0,
//     discount_percent: data.discount_percent ? parseFloat(data.discount_percent) : 0,
//     reviews_allowed: data.reviews_allowed ?? true,
//     average_rating: data.average_rating ? parseFloat(data.average_rating) : 0.0,
//     rating_count: data.rating_count ? parseInt(data.rating_count) : 0,
//     total_sales: data.total_sales ? parseInt(data.total_sales) : 0,
//     seo_title: data.seo_title || null,
//     seo_description: data.seo_description || null,
//     created_by: data.created_by ? parseInt(data.created_by) : null,
//   };

//   return await Product.create(productData);
// };

export const getAllActiveProducts = async ({
  limit = 10,
  offset = 0,
  search = "",
  is_active = true,
} = {}) => {
  const whereClause = {};

  // Filter by active flag
  if (typeof is_active === "boolean") {
    whereClause.is_active = is_active;
  }

  // Search by name or description
  if (search && search.trim()) {
    whereClause[Op.or] = [
      { name: { [Op.iLike]: `%${search.trim()}%` } },
      { description: { [Op.iLike]: `%${search.trim()}%` } },
    ];
  }

  const { rows, count } = await Product.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [["created_at", "DESC"]],
  });

  return {
    total: count,
    limit,
    offset,
    products: rows,
  };
};

export const getAllProducts = async ({
  limit = 10,
  offset = 0,
  search = "",
} = {}) => {
  const whereClause = {};

  // Search by name or description
  if (search && search.trim()) {
    whereClause[Op.or] = [
      { name: { [Op.iLike]: `%${search.trim()}%` } },
      { description: { [Op.iLike]: `%${search.trim()}%` } },
    ];
  }

  const { rows, count } = await Product.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [["created_at", "DESC"]],
  });

  return {
    total: count,
    limit,
    offset,
    products: rows,
  };
};


export const getProductsByCategory = async ({
  categoryId,
  limit = 10,
  offset = 0,
  search = "",
  is_active = true,
}) => {
  if (!categoryId) {
    throw new Error("Category ID is required");
  }

  const whereClause = {
    category_id: categoryId,
  };

  // Optional active filter
  if (typeof is_active === "boolean") {
    whereClause.is_active = is_active;
  }

  // Optional search
  if (search && search.trim()) {
    whereClause[Op.or] = [
      { name: { [Op.iLike]: `%${search.trim()}%` } },
      { description: { [Op.iLike]: `%${search.trim()}%` } },
    ];
  }

  const { rows, count } = await Product.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [["created_at", "DESC"]],
  });

  return {
    total: count,
    limit,
    offset,
    products: rows,
  };
};

export const getProductBySlug = async (slug) => {
  if (!slug) {
    throw new Error("Product slug is required");
  }

  const product = await Product.findOne({
    where: { slug },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};


export const updateProduct = async ({ id, data }) => {
  if (!id) throw new Error("Product ID is required");

  const product = await Product.findByPk(id);
  if (!product) throw new Error("Product not found");

  // Update slug if name changes
  if (data.name && data.name !== product.name) {
    let slug = generateSlug(data.name);
    let slugExists;
    let attempts = 0;

    do {
      if (attempts > 5) throw new Error("Failed to generate unique slug");
      slugExists = await Product.findOne({
        where: { slug, id: { [db.Sequelize.Op.ne]: id } },
      });
      if (slugExists) slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
      attempts++;
    } while (slugExists);

    data.slug = slug;
  }

  // Update only allowed fields (ignore barcode)
  const allowedFields = [
    "name",
    "slug",
    "description",
    "short_description",
    "category_id",
    "sub_category_id",
    "brand_id",
    "material_id",
    "color_id",
    "type",
    "status",
    "is_active",
    "visibility",
    "featured",
    "weight",
    "dimensions",
    "shipping_required",
    "tax_status",
    "manage_stock",
    "stock_status",
    "backorders_allowed",
    "sold_individually",
    "unit_factor",
    "unit_code",
    "cost_price",
    "selling_price",
    "discount_amount",
    "discount_percent",
    "reviews_allowed",
    "average_rating",
    "rating_count",
    "total_sales",
    "seo_title",
    "seo_description",
  ];

  const updateData = {};
  allowedFields.forEach((key) => {
    if (data[key] !== undefined) updateData[key] = data[key];
  });

  updateData.updated_at = new Date();

  await product.update(updateData);

  return product;
};

export const deleteProduct = async ({ id, soft = true }) => {
  if (!id) {
    throw new Error("Product ID is required");
  }

  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  if (soft) {
    // Toggle the is_active flag
    const newStatus = !product.is_active;
    await product.update({ is_active: newStatus });

    return {
      success: true,
      message: `Product ${newStatus ? "activated" : "deactivated"} successfully`,
      product: { id: product.id, is_active: newStatus },
    };
  }
  await product.destroy();

  return {
    success: true,
    message: "Product deleted permanently",
  };
};