export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    success: false,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};