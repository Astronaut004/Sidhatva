// productCategoryService.js

import { ProductCategory, Product } from "../models/index.js";
import generateSlug from "../utils/generateSlug.js";
import generateSeoTitle from "../utils/seoGenerate.js";
import { Op } from 'sequelize';

// services --> getallCategory, getCategoryBySlug, createCategory, updateCategory, deleteCategory, changeStateCategory


export const createCategory = async ({ name, description = "", seo_title, is_active = true, userId }) => {
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw { code: "INVALID_NAME", message: "Name is required and must be a non-empty string" };
  }

  const trimmedName = name.trim();
  if (trimmedName.length > 255) {
    throw { code: "INVALID_NAME", message: "Name cannot exceed 255 characters" };
  }

  const slug = generateSlug(trimmedName);
  const finalSeoTitle = seo_title || generateSeoTitle(trimmedName, description);

  try {
    const category = await ProductCategory.create({
      name: trimmedName,
      description: description.trim(),
      slug,
      seo_title: finalSeoTitle,
      is_active,
      created_by: userId || null,
    });

    return {
      success: true,
      message: "Category created successfully",
      category: category.toJSON(),
    };
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw { code: "CATEGORY_EXISTS", message: "Category with this name or slug already exists" };
    }
    throw error;
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
    attributes: ['id', 'name', 'description', 'slug', 'seo_title', 'created_by', 'created_at']
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
    attributes: ['id', 'name', 'description', 'slug', 'seo_title', 'is_active', 'created_at', 'created_by']
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
      is_active: true
    },
    attributes: ['id', 'name', 'description', 'slug', 'seo_title', 'created_by']
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
    // First, fetch the current state of the category
    const currentStatus = category.is_active;

    // Toggle the value
    const newStatus = !currentStatus;

    // Update the category
    await category.update({ is_active: newStatus });

    // Update all associated products with the same toggle
    await Product.update(
      { is_active: newStatus },
      { where: { category_id: id } }
    );

    return {
      success: true,
      message: `Category ${newStatus ? "activated" : "deactivated"} successfully`,
      category: { id: category.id, is_active: newStatus }
    };
  }
  if (!soft) {
    // Delete all products linked to this category first
    await Product.destroy({ where: { category_id: id } });

    // Then delete the category itself
    await category.destroy();
    return { success: true, message: "Category and its products deleted successfully" };
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