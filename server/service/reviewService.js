// --- File: services/reviewService.js ---

const { Review, Product, sequelize } = require('../models');

/**
 * Creates a new review for a product and updates the product's average rating.
 * @param {number} userId - The ID of the user writing the review.
 * @param {number} productId - The ID of the product being reviewed.
 * @param {object} reviewData - The review data { rating, comment }.
 * @returns {Promise<object>} The newly created review.
 */
exports.createReview = async (userId, productId, reviewData) => {
  const { rating, comment } = reviewData;

  const t = await sequelize.transaction();
  try {
    // Create the review
    const newReview = await Review.create({
      product_id: productId,
      user_id: userId,
      rating,
      comment,
    }, { transaction: t });

    // After creating the review, recalculate the product's average rating
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
      }, {
        where: { id: productId },
        transaction: t,
      });
    }

    await t.commit();
    return newReview;

  } catch (error) {
    await t.rollback();
    // Handle unique constraint error (user already reviewed)
    if (error.name === 'SequelizeUniqueConstraintError') {
        const customError = new Error('You have already reviewed this product.');
        customError.statusCode = 409; // Conflict
        throw customError;
    }
    throw error;
  }
};

/**
 * Retrieves all reviews for a specific product.
 * @param {number} productId - The ID of the product.
 * @returns {Promise<Array>} An array of reviews for the product.
 */
exports.getProductReviews = async (productId) => {
    return Review.findAll({
        where: { product_id: productId, is_approved: true },
        include: {
            association: 'user',
            attributes: ['id'],
            include: {
                association: 'profile',
                attributes: ['first_name']
            }
        },
        order: [['created_at', 'DESC']]
    });
};