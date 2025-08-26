const { Order, OrderItem, Cart, CartItem, Product, sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid'); // For generating unique order numbers

/**
 * Creates an order from the user's cart.
 * @param {number} userId - The ID of the user placing the order.
 * @param {object} orderData - Additional data for the order (e.g., paymentMethod, addressId).
 * @returns {Promise<object>} The newly created order.
 */
exports.createOrderFromCart = async (userId, orderData) => {
  const { paymentMethod, shippingAddressId, billingAddressId } = orderData;

  // 1. Find the user's active cart
  const cart = await Cart.findOne({
    where: { user_id: userId, is_active: true },
    include: [{
      model: CartItem,
      as: 'items',
      include: { model: Product, as: 'product' }
    }]
  });

  if (!cart || !cart.items || cart.items.length === 0) {
    const error = new Error('Your cart is empty.');
    error.statusCode = 400; // Bad Request
    throw error;
  }

  // 2. Use a transaction to ensure all database operations succeed or fail together
  const t = await sequelize.transaction();
  try {
    // 3. Create the main order record
    const newOrder = await Order.create({
      user_id: userId,
      order_number: `ORD-${uuidv4().split('-')[0].toUpperCase()}`, // Generate a unique order number
      status: 'confirmed', // Or 'pending' if payment is not immediate
      payment_status: 'pending',
      payment_method: paymentMethod,
      shipping_address_id: shippingAddressId,
      billing_address_id: billingAddressId,
      subtotal: cart.subtotal,
      tax_amount: cart.tax_amount,
      shipping_amount: cart.shipping_amount,
      discount_amount: cart.discount_amount,
      total_amount: cart.total_amount,
    }, { transaction: t });

    // 4. Create order items from cart items
    const orderItems = cart.items.map(item => ({
      order_id: newOrder.id,
      product_id: item.product_id,
      product_name: item.product.name,
      product_sku: item.product.sku,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.total_price,
    }));

    await OrderItem.bulkCreate(orderItems, { transaction: t });

    // 5. Deactivate the cart so it can't be used again
    await cart.update({ is_active: false }, { transaction: t });
    
    // (Optional) Here you would also reduce stock quantities for the purchased products.

    // 6. If everything is successful, commit the transaction
    await t.commit();

    // 7. Return the newly created order with its items
    return Order.findByPk(newOrder.id, {
        include: { model: OrderItem, as: 'items' }
    });

  } catch (error) {
    // If any step fails, roll back all database changes
    await t.rollback();
    throw error; // Re-throw the error to be handled by the global error handler
  }
};

/**
 * Retrieves all orders for a specific user.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array>} A list of the user's orders.
 */
exports.getUserOrders = async (userId) => {
    return Order.findAll({
        where: { user_id: userId },
        order: [['created_at', 'DESC']],
        include: { model: OrderItem, as: 'items' }
    });
};
