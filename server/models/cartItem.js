// --- File: models/cartItem.js ---
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    // ... (all the fields for the cart_items table)
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: DataTypes.BIGINT,
    product_id: DataTypes.BIGINT,
    quantity: DataTypes.INTEGER,
    // ...etc
  }, {
    tableName: 'cart_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id', as: 'cart' });
    CartItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return CartItem;
};