export default (sequelize, DataTypes) => {
  const Wishlist = sequelize.define(
    "Wishlist",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "users", // table name
          key: "id",
        },
        onDelete: "CASCADE",
      },
      name: {
        type: DataTypes.STRING(255),
        defaultValue: "My Wishlist",
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.BIGINT,
        references: {
          model: "users", // table name
          key: "id",
        },
      },
      guest_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      tableName: "wishlists",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Associations
  Wishlist.associate = (models) => {
    // Each wishlist belongs to a user (owner)
    Wishlist.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });

    // A user might also be the creator (different from owner, for admin/vendor created wishlists)
    Wishlist.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });
  };

  return Wishlist;
};
