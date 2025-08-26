import { Wishlist, WishlistItem, Product } from '../models';

/**
 * Finds or creates the default wishlist for a given user.
 * @param {number} userId - The ID of the logged-in user.
 * @returns {Promise<object>} The user's default wishlist.
 */
const findOrCreateWishlist = async (userId) => {
  const [wishlist] = await Wishlist.findOrCreate({
    where: { user_id: userId, is_default: true },
    defaults: { user_id: userId },
  });
  return wishlist;
};

/**
 * Gets the user's default wishlist with all its items and product details.
 * @param {number} userId - The ID of the logged-in user.
 * @returns {Promise<object>} The user's wishlist.
 */
export const getWishlist = async (userId) => {
  const wishlist = await findOrCreateWishlist(userId);

  return Wishlist.findByPk(wishlist.id, {
    include: {
      model: WishlistItem,
      as: 'items',
      include: {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'slug', 'selling_price'],
      },
    },
    order: [[{ model: WishlistItem, as: 'items' }, 'added_at', 'DESC']],
  });
};

/**
 * Adds an item to the user's default wishlist.
 * @param {number} userId - The ID of the logged-in user.
 * @param {object} itemData - Data for the item to add { productId }.
 * @returns {Promise<object>} The updated wishlist.
 */
export const addItemToWishlist = async (userId, itemData) => {
  const { productId } = itemData;

  const product = await Product.findByPk(productId);
  if (!product) {
    const error = new Error('Product not found.');
    error.statusCode = 404;
    throw error;
  }

  const wishlist = await findOrCreateWishlist(userId);

  // findOrCreate prevents adding duplicate items
  await WishlistItem.findOrCreate({
    where: { wishlist_id: wishlist.id, product_id: productId },
    defaults: {
      wishlist_id: wishlist.id,
      product_id: productId,
    },
  });

  return getWishlist(userId);
};

/**
 * Removes an item from the user's wishlist.
 * @param {number} userId - The ID of the logged-in user.
 * @param {number} wishlistItemId - The ID of the wishlist item to remove.
 * @returns {Promise<object>} The updated wishlist.
 */
export const removeItemFromWishlist = async (userId, wishlistItemId) => {
  const wishlist = await findOrCreateWishlist(userId);

  await WishlistItem.destroy({
    where: {
      id: wishlistItemId,
      wishlist_id: wishlist.id, // Ensures users can only delete items from their own wishlist
    },
  });

  return getWishlist(userId);
};