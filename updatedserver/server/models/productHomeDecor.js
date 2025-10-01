// models/homeDecorProduct.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const HomeDecorProduct = sequelize.define(
    "HomeDecorProduct",
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
      details: {
        type: DataTypes.TEXT, // Extra info about the product
      },
      specification: {
        type: DataTypes.JSON, // { material, size, color, etc. }
      },
      potential_use: {
        type: DataTypes.JSON, // Array or object describing uses
      },
      key_features: {
        type: DataTypes.JSON, // Array or object listing key features
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
      tableName: "homedecor_products",
      timestamps: false,
      underscored: true,
    }
  );

  // Associations
  HomeDecorProduct.associate = (models) => {
    HomeDecorProduct.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
      onDelete: "CASCADE",
    });
  };

  return HomeDecorProduct;
};
