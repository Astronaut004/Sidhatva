module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define('Wishlist', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      defaultValue: 'My Wishlist',
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'wishlists',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Wishlist.associate = (models) => {
    // A wishlist belongs to one user
    Wishlist.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    // A wishlist can have many items
    Wishlist.hasMany(models.WishlistItem, { foreignKey: 'wishlist_id', as: 'items' });
  };

  return Wishlist;
};
