import { Cart, CartItem, Product, sequelize } from '../models';

/**
 * Finds or creates a cart for a given user.
 * @param {number} userId - The ID of the logged-in user.
 * @returns {Promise<object>} The user's cart.
 */
const findOrCreateCart = async (userId) => {
  const [cart] = await Cart.findOrCreate({
    where: { user_id: userId, is_active: true },
    defaults: { user_id: userId },
  });
  return cart;
};

/**
 * Recalculates the totals for a given cart.
 * @param {number} cartId - The ID of the cart to recalculate.
 * @returns {Promise<object>} The updated cart object.
 */
const recalculateCartTotals = async (cartId) => {
  const cart = await Cart.findByPk(cartId, {
    include: [{ model: CartItem, as: 'items' }],
  });

  if (!cart) return null;

  const subtotal = cart.items.reduce(
    (sum, item) => sum + parseFloat(item.total_price),
    0
  );

  // In a real app, you would calculate tax and shipping here.
  const taxAmount = subtotal * 0.18; // Example: 18% tax
  const totalAmount = subtotal + taxAmount;

  await cart.update({
    subtotal: subtotal.toFixed(2),
    tax_amount: taxAmount.toFixed(2),
    total_amount: totalAmount.toFixed(2),
  });

  return cart;
};

/**
 * Gets the user's current cart with all its items and product details.
 * @param {number} userId - The ID of the logged-in user.
 * @returns {Promise<object>} The user's cart.
 */
export const getCart = async (userId) => {
  const cart = await findOrCreateCart(userId);

  return Cart.findByPk(cart.id, {
    include: {
      model: CartItem,
      as: 'items',
      include: {
        model: Product,
        as: 'product',
        attributes: ['name', 'slug', 'selling_price'],
      },
    },
    order: [[{ model: CartItem, as: 'items' }, 'created_at', 'DESC']],
  });
};

/**
 * Adds an item to the user's cart or updates its quantity if it already exists.
 * @param {number} userId - The ID of the logged-in user.
 * @param {object} itemData - Data for the item to add { productId, quantity }.
 * @returns {Promise<object>} The updated cart.
 */
export const addItemToCart = async (userId, itemData) => {
  const { productId, quantity } = itemData;

  const product = await Product.findByPk(productId);
  if (!product || product.stock_status !== 'instock') {
    const error = new Error('Product not found or is out of stock.');
    error.statusCode = 404;
    throw error;
  }

  const cart = await findOrCreateCart(userId);

  // Use a transaction to ensure data integrity
  const t = await sequelize.transaction();
  try {
    const [cartItem, created] = await CartItem.findOrCreate({
      where: { cart_id: cart.id, product_id: productId },
      defaults: {
        quantity,
        unit_price: product.selling_price,
        total_price: quantity * product.selling_price,
      },
      transaction: t,
    });

    if (!created) {
      // If the item already exists, update its quantity
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
  return getCart(userId); // Use the named export function directly
};
