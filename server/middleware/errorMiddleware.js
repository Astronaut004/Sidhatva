// --- File: middleware/errorMiddleware.js ---

export const errorHandler = (err, req, res, next) => {
  // Use the status code from the error or default to 500
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message,
    success: false,
    // Show stack trace only in non-production environments
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
