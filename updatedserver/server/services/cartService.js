import db from '../models/index.js';
const { Cart, CartItem, Product, sequelize } = db;

const findOrCreateCart = async (userId) => {
  const [cart] = await Cart.findOrCreate({
    where: { user_id: userId, is_active: true },
    defaults: { user_id: userId }
  });
  return cart;
};

const recalculateCartTotals = async (cartId) => {
  const cart = await Cart.findByPk(cartId, { include: [{ model: CartItem, as: 'items' }] });
  if (!cart) return null;
  const subtotal = cart.items.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
  const taxAmount = subtotal * 0.18;
  const totalAmount = subtotal + taxAmount;
  await cart.update({
    subtotal: subtotal.toFixed(2),
    tax_amount: taxAmount.toFixed(2),
    total_amount: totalAmount.toFixed(2),
  });
  return cart;
};

export const getCart = async (userId) => {
  const cart = await findOrCreateCart(userId);
  return Cart.findByPk(cart.id, {
    include: {
      model: CartItem,
      as: 'items',
      include: { model: Product, as: 'product', attributes: ['name', 'slug', 'selling_price'] }
    },
    order: [[{ model: CartItem, as: 'items' }, 'created_at', 'DESC']]
  });
};

export const addItemToCart = async (userId, itemData) => {
  const { productId, quantity } = itemData;
  const product = await Product.findByPk(productId);
  if (!product || product.stock_status !== 'instock') {
    const error = new Error('Product not found or is out of stock.');
    error.statusCode = 404;
    throw error;
  }
  const cart = await findOrCreateCart(userId);
  const t = await sequelize.transaction();
  try {
    const [cartItem, created] = await CartItem.findOrCreate({
      where: { cart_id: cart.id, product_id: productId },
      defaults: {
        quantity: quantity,
        unit_price: product.selling_price,
        total_price: quantity * product.selling_price,
      },
      transaction: t,
    });
    if (!created) {
      cartItem.quantity += quantity;
      cartItem.total_price = cartItem.quantity * cartItem.unit_price;
      await cartItem.save({ transaction: t });
    }
    await t.commit();
  } catch (error) {
    await t.rollback();
    throw error;
  }
  await recalculateCartTotals(cart.id);
  return getCart(userId);
};
