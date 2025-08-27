import db from '../models/index.js';
const { Order, OrderItem, Cart, CartItem, Product, sequelize } = db;
import { v4 as uuidv4 } from 'uuid';

export const createOrderFromCart = async (userId, orderData) => {
  const { paymentMethod, shippingAddressId, billingAddressId } = orderData;
  const cart = await Cart.findOne({
    where: { user_id: userId, is_active: true },
    include: [{ model: CartItem, as: 'items', include: { model: Product, as: 'product' } }]
  });
  if (!cart || !cart.items || cart.items.length === 0) {
    const error = new Error('Your cart is empty.');
    error.statusCode = 400;
    throw error;
  }
  const t = await sequelize.transaction();
  try {
    const newOrder = await Order.create({
      user_id: userId,
      order_number: `ORD-${uuidv4().split('-')[0].toUpperCase()}`,
      status: 'confirmed',
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
    await cart.update({ is_active: false }, { transaction: t });
    await t.commit();
    return Order.findByPk(newOrder.id, { include: { model: OrderItem, as: 'items' } });
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const getUserOrders = async (userId) => {
  return Order.findAll({
    where: { user_id: userId },
    order: [['created_at', 'DESC']],
    include: { model: OrderItem, as: 'items' }
  });
};