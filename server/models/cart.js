export default (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', { id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, }, user_id: { type: DataTypes.BIGINT, references: { model: 'users', key: 'id' } }, session_id: { type: DataTypes.STRING(255), }, subtotal: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00, }, tax_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00, }, shipping_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00, }, discount_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00, }, total_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00, }, is_active: { type: DataTypes.BOOLEAN, defaultValue: true, }, }, { tableName: 'carts', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', });
  Cart.associate = (models) => { Cart.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' }); Cart.hasMany(models.CartItem, { foreignKey: 'cart_id', as: 'items' }); };
  return Cart;
};
