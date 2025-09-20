
import { Cart, CartItem, Product } from "../models/index.js";
import { v4 as uuidv4 } from 'uuid';

//services i need to make
// Phase 1: Core Cart (minimal working cart)

// createCart(userId / sessionId)
const cartInclude = {
  model: CartItem,
  as: "items",
  include: {
    model: Product,
    as: "product",
    attributes: ["id", "name", "slug", "selling_price"],
  },
};

export const createCart = async ({ userId = null, sessionId = null, createdBy = null }) => {
  // If neither userId nor sessionId is provided → generate a fresh one
  if (!userId && !sessionId) {
    let newSession;
    let exists = true;
    while (exists) {
      newSession = uuidv4();
      const found = await Cart.findOne({ where: { session_id: newSession } });
      if (!found) {
        exists = false;
        sessionId = newSession;
      }
    }
  }

  let cart = await Cart.findOne({
    where: userId ? { user_id: userId } : { session_id: sessionId },
    include: cartInclude,
  });
  if (cart) {
    return cart;
  }

  cart = await Cart.create({
    user_id: userId,
    session_id: sessionId,
    subtotal: 0,
    tax_amount: 0,
    shipping_amount: 0,
    discount_amount: 0,
    total_amount: 0,
    currency: 'INR',
    expires_at: userId ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days for guests
    created_by: createdBy || userId,
  });
  return await Cart.findOne({
    where: { id: cart.id },
    include: cartInclude,
  });
}
















































// Called when first item is added.

// Creates a new cart row.

// getCart(userId / sessionId)

// Fetch the active cart (with items).

// This replaces getCartById.

// addItemToCart(cartId, productId, variantId, quantity)

// Create or update cart_items row.

// Ensure unique (cart_id, product_id, variant_id).

// updateItemQuantity(cartId, productId, variantId, newQuantity)

// Adjust quantity (e.g. +1, -1, or set exact).

// removeItemFromCart(cartId, productId, variantId)

// Delete a row from cart_items.

// recalculateTotals(cartId)

// Update subtotal, tax, discounts, and total.

// Should be called after any modification.