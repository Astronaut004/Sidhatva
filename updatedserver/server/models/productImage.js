// productImage.js
// models/productImage.js
export default (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    "ProductImage",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      variant_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "product_variants",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      alt_text: {
        type: DataTypes.STRING(255),
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      image_type: {
        type: DataTypes.STRING(50), // e.g. "thumbnail", "gallery", "zoom"
      },
      image_size: {
        type: DataTypes.BIGINT, // file size in bytes
      },
      position: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      created_by: {
        type: DataTypes.BIGINT,
        references: {
          model: "users",
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
      tableName: "product_images",
      timestamps: false, // we already have created_at, updated_at
      underscored: true,
    }
  );

  // Associations
  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
      onDelete: "CASCADE",
    });

    ProductImage.belongsTo(models.ProductVariant, {
      foreignKey: "variant_id",
      as: "variant",
      onDelete: "CASCADE",
    });

    ProductImage.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
      onDelete: "SET NULL",
    });
  };

  return ProductImage;
};
