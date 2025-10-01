// models/furnitureProduct.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const FurnitureProduct = sequelize.define(
    "FurnitureProduct",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
        references: { model: "products", key: "id" },
        onDelete: "CASCADE",
      },
      length: {
        type: DataTypes.DECIMAL(10, 2),
      },
      width: {
        type: DataTypes.DECIMAL(10, 2),
      },
      height: {
        type: DataTypes.DECIMAL(10, 2),
      },
      weight: {
        type: DataTypes.DECIMAL(10, 3),
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
      tableName: "furniture_products",
      timestamps: false,
      underscored: true,
    }
  );

  // Associations
  FurnitureProduct.associate = (models) => {
    FurnitureProduct.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
      onDelete: "CASCADE",
    });
  };

  return FurnitureProduct;
};
