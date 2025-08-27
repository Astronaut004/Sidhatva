import db from '../models/index.js';
const { Review, Product, sequelize } = db;

export const createReview = async (userId, productId, reviewData) => {
  const { rating, comment } = reviewData;
  const t = await sequelize.transaction();
  try {
    const newReview = await Review.create({
      product_id: productId,
      user_id: userId,
      rating,
      comment,
    }, { transaction: t });
    const stats = await Review.findAll({
      where: { product_id: productId },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'ratingCount'],
        [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
      ],
      raw: true,
      transaction: t,
    });
    if (stats && stats[0]) {
      await Product.update({
        rating_count: stats[0].ratingCount,
        average_rating: parseFloat(stats[0].averageRating).toFixed(2),
      }, { where: { id: productId }, transaction: t });
    }
    await t.commit();
    return newReview;
  } catch (error) {
    await t.rollback();
    if (error.name === 'SequelizeUniqueConstraintError') {
      const customError = new Error('You have already reviewed this product.');
      customError.statusCode = 409;
      throw customError;
    }
    throw error;
  }
};

export const getProductReviews = async (productId) => {
  return Review.findAll({
    where: { product_id: productId, is_approved: true },
    include: {
      association: 'user',
      attributes: ['id'],
      include: { association: 'profile', attributes: ['first_name'] }
    },
    order: [['created_at', 'DESC']]
  });
};