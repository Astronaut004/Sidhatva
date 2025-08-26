// --- File: models/productCategory.js ---

const slugify = require('slugify');

module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'product_categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeValidate: (category) => {
        if (category.name) {
          category.slug = slugify(category.name, { lower: true, strict: true });
        }
      }
    }
  });

  ProductCategory.associate = (models) => {
    // A category can have many products
    ProductCategory.hasMany(models.Product, { foreignKey: 'category_id', as: 'products' });
  };

  return ProductCategory;
};


