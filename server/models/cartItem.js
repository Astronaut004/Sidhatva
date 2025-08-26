export default (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: DataTypes.BIGINT,
    product_id: DataTypes.BIGINT,
    quantity: DataTypes.INTEGER,
    // Add other fields here as needed
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
