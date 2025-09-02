// productCategoryService.js

import { ProductCategory } from "../models/index.js";
import generateSlug from "../utils/generateSlug.js";
import generateSeoTitle from "../utils/seoGenerate.js";

// services --> getallCategory, getCategoryBySlug, createCategory, updateCategory, deleteCategory, changeStateCategory


export const createCategory = async ({ name, description = "", seo_title, is_active = true }) => {
  // Input validation
  if (!name || typeof name !== 'string') {
    throw new Error("Name is required and must be a string");
  }

  // Trim and validate name length
  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    throw new Error("Name cannot be empty");
  }
  if (trimmedName.length > 255) {
    throw new Error("Name cannot exceed 255 characters");
  }

  try {
    // Check for existing category (case-insensitive)
    const existingCategory = await ProductCategory.findOne({ 
      where: { 
        name: {
          [Op.iLike]: trimmedName // Case-insensitive check
        }
      } 
    });

    if (existingCategory) {
      throw new Error(`Category with name "${trimmedName}" already exists`);
    }

    const slug = generateSlug(trimmedName);
    
    // Check for slug conflicts
    const existingSlug = await ProductCategory.findOne({ where: { slug } });
    if (existingSlug) {
      throw new Error(`A category with this slug already exists`);
    }

    const finalSeoTitle = seo_title || generateSeoTitle(trimmedName, description);

    const category = await ProductCategory.create({
      name: trimmedName,
      description: description.trim(),
      slug,
      seo_title: finalSeoTitle,
      is_active,
    });

    return {
      success: true,
      message: "Category created successfully",
      category: category.toJSON(),
    };
  } catch (error) {
    // Log error for debugging
    console.error('Error creating category:', error);
    
    // Re-throw known errors, wrap unknown ones
    if (error.message.includes('already exists') || error.message.includes('required')) {
      throw error;
    }
    throw new Error('Failed to create category. Please try again.');
  }
};

export const getAllActiveCategories = async ({ limit, offset, search } = {}) => {
  const whereClause = { is_active: true };

  // Add search functionality
  if (search && search.trim()) {
    whereClause[Op.or] = [
      { name: { [Op.iLike]: `%${search.trim()}%` } },
      { description: { [Op.iLike]: `%${search.trim()}%` } }
    ];
  }

  const options = {
    where: whereClause,
    order: [['created_at', 'DESC']],
    attributes: ['id', 'name', 'description', 'slug', 'seo_title', 'created_at']
  };

  // Add pagination if provided
  if (limit) {
    options.limit = parseInt(limit);
    if (offset) {
      options.offset = parseInt(offset);
    }
  }

  const { count, rows } = await ProductCategory.findAndCountAll(options);

  return {
    success: true,
    categories: rows.map(category => category.toJSON()),
    total: count,
    ...(limit && { pagination: { limit: parseInt(limit), offset: parseInt(offset || 0) } })
  };
};


export const getAllCategories = async ({ includeInactive = false, limit, offset } = {}) => {
  const options = {
    order: [['created_at', 'DESC']],
    attributes: ['id', 'name', 'description', 'slug', 'seo_title', 'is_active', 'created_at']
  };

  if (!includeInactive) {
    options.where = { is_active: true };
  }

  // Add pagination if provided
  if (limit) {
    options.limit = parseInt(limit);
    options.offset = parseInt(offset || 0);
  }

  const { count, rows } = await ProductCategory.findAndCountAll(options);

  const result = {
    success: true,
    categories: rows.map(category => category.toJSON()),
    total: count
  };

  if (limit) {
    result.pagination = {
      limit: parseInt(limit),
      offset: parseInt(offset || 0)
    };
  }

  return result;
};


export const getCategoryBySlug = async ({ slug }) => {
  if (!slug || typeof slug !== 'string') {
    throw new Error("Slug is required and must be a string");
  }

  const category = await ProductCategory.findOne({ 
    where: { 
      slug: slug.trim(),
      is_active: true // Only return active categories
    },
    attributes: ['id', 'name', 'description', 'slug', 'seo_title']
  });

  if (category) {
    return {
      success: true,
      category: category.toJSON()
    };
  }

  return {
    success: false,
    message: "Category not found"
  };
};

export const updateCategory = async ({ id, name, description, seo_title, is_active }) => {
  if (!id) {
    throw new Error("Category ID is required");
  }

  const category = await ProductCategory.findByPk(id);

  if (!category) {
    throw new Error("Category not found");
  }

  const updateData = {};

  if (name !== undefined) {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      throw new Error("Name cannot be empty");
    }
    if (trimmedName.length > 255) {
      throw new Error("Name cannot exceed 255 characters");
    }

    // Check for duplicate names (excluding current category)
    const existingCategory = await ProductCategory.findOne({
      where: {
        name: { [Op.iLike]: trimmedName },
        id: { [Op.ne]: id }
      }
    });

    if (existingCategory) {
      throw new Error(`Category with name "${trimmedName}" already exists`);
    }

    updateData.name = trimmedName;
    updateData.slug = generateSlug(trimmedName);
  }

  if (description !== undefined) {
    updateData.description = description.trim();
  }

  if (seo_title !== undefined) {
    updateData.seo_title = seo_title;
  }

  if (is_active !== undefined) {
    updateData.is_active = Boolean(is_active);
  }

  await category.update(updateData);

  return {
    success: true,
    message: "Category updated successfully",
    category: category.toJSON()
  };
};


export const deleteCategory = async ({ id, soft = true }) => {
  if (!id) {
    throw new Error("Category ID is required");
  }

  const category = await ProductCategory.findByPk(id);

  if (!category) {
    throw new Error("Category not found");
  }

  if (soft) {
    // Soft delete - just mark as inactive
    await category.update({ is_active: false });
    return {
      success: true,
      message: "Category deactivated successfully"
    };
  } else {
    // Hard delete - check for associated products first
    const productCount = await Product.count({ where: { category_id: id } });

    if (productCount > 0) {
      throw new Error(`Cannot delete category. ${productCount} products are associated with this category`);
    }

    await category.destroy();
    return {
      success: true,
      message: "Category deleted successfully"
    };
  }
};

export const getCategoryById = async ({ id }) => {
  if (!id) {
    throw new Error("Category ID is required");
  }

  const category = await ProductCategory.findByPk(id, {
    attributes: [
      'id',
      'name',
      'description',
      'slug',
      'seo_title',
      'is_active',
      'created_at',
      'updated_at'
    ]
  });

  if (category) {
    return {
      success: true,
      category: category.toJSON()
    };
  }

  return {
    success: false,
    message: "Category not found"
  };
};

export const getCategoriesWithProductCount = async () => {
  const categories = await ProductCategory.findAll({
    where: { is_active: true },
    attributes: [
      'id',
      'name',
      'description',
      'slug',
      'seo_title',
      [sequelize.fn('COUNT', sequelize.col('Products.id')), 'product_count']
    ],
    include: [{
      model: Product,
      attributes: [],
      required: false
    }],
    group: ['ProductCategory.id'],
    order: [['created_at', 'DESC']]
  });

  return {
    success: true,
    categories: categories.map(category => category.toJSON())
  };
};
