// models/brand.js
import slugify from "slugify";

export default (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    "Brand",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        unique: true,
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
      logo_url: {
        type: DataTypes.STRING(500),
      },
      website_url: {
        type: DataTypes.STRING(500),
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.BIGINT,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
      },
    },
    {
      tableName: "brands",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      hooks: {
        beforeValidate: (brand) => {
          if (brand.name) {
            brand.slug = slugify(brand.name, { lower: true, strict: true });
          }
        },
      },
    }
  );

  // Associations
  Brand.associate = (models) => {
    Brand.hasMany(models.Product, {
      foreignKey: "brand_id",
      as: "products",
    });

    Brand.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });
  };

  return Brand;
};
