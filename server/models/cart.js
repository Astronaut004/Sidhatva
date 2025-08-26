export default (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.BIGINT,
    // Add other fields here as needed
  }, {
    tableName: 'carts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Cart.hasMany(models.CartItem, { foreignKey: 'cart_id', as: 'items' });
  };

  return Cart;
};
