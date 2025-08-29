// productSubCategory.js

// models/productSubCategory.js
import slugify from "slugify";

export default (sequelize, DataTypes) => {
  const ProductSubCategory = sequelize.define(
    "ProductSubCategory",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      category_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "ProductCategories", // table name OR Sequelize model
          key: "id",
        },
        onDelete: "CASCADE",
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
      description: {
        type: DataTypes.TEXT,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      seo_title: {
        type: DataTypes.STRING(200),
      },
      created_by: {
        type: DataTypes.BIGINT,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "sub_categories",
      timestamps: false, // since you're manually handling created_at, updated_at
      hooks: {
        beforeValidate: (subCategory) => {
          if (subCategory.name && !subCategory.slug) {
            subCategory.slug = slugify(subCategory.name, { lower: true });
          }
        },
      },
    }
  );

  ProductSubCategory.associate = (models) => {
    ProductSubCategory.belongsTo(models.ProductCategory, {
      foreignKey: "category_id",
      as: "category",
      onDelete: "CASCADE",
    });

    ProductSubCategory.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
      onDelete: "SET NULL",
    });
  };

  return ProductSubCategory;
};