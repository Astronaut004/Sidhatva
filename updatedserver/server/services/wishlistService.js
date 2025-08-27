import db from '../models/index.js';
const { Wishlist, WishlistItem, Product } = db;

const findOrCreateWishlist = async (userId) => {
  const [wishlist] = await Wishlist.findOrCreate({
    where: { user_id: userId, is_default: true },
    defaults: { user_id: userId }
  });
  return wishlist;
};

export const getWishlist = async (userId) => {
  const wishlist = await findOrCreateWishlist(userId);
  return Wishlist.findByPk(wishlist.id, {
    include: {
      model: WishlistItem,
      as: 'items',
      include: { model: Product, as: 'product', attributes: ['id', 'name', 'slug', 'selling_price'] }
    },
    order: [[{ model: WishlistItem, as: 'items' }, 'added_at', 'DESC']]
  });
};

export const addItemToWishlist = async (userId, itemData) => {
  const { productId } = itemData;
  const product = await Product.findByPk(productId);
  if (!product) {
    const error = new Error('Product not found.');
    error.statusCode = 404;
    throw error;
  }
  const wishlist = await findOrCreateWishlist(userId);
  await WishlistItem.findOrCreate({
    where: { wishlist_id: wishlist.id, product_id: productId },
    defaults: { wishlist_id: wishlist.id, product_id: productId }
  });
  return getWishlist(userId);
};

export const removeItemFromWishlist = async (userId, wishlistItemId) => {
  const wishlist = await findOrCreateWishlist(userId);
  await WishlistItem.destroy({ where: { id: wishlistItemId, wishlist_id: wishlist.id } });
  return getWishlist(userId);
};
