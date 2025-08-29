export default (sequelize, DataTypes) => {
  const WishlistItem = sequelize.define(
    "WishlistItem",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      wishlist_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "wishlists",
          key: "id",
        },
        onDelete: "CASCADE",
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
      },
      guest_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      added_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "wishlist_items",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Associations
  WishlistItem.associate = (models) => {
    WishlistItem.belongsTo(models.Wishlist, {
      foreignKey: "wishlist_id",
      as: "wishlist",
      onDelete: "CASCADE",
    });

    WishlistItem.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
      onDelete: "CASCADE",
    });

    WishlistItem.belongsTo(models.ProductVariant, {
      foreignKey: "variant_id",
      as: "variant",
      onDelete: "CASCADE",
    });

    WishlistItem.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });
  };

  return WishlistItem;
};
