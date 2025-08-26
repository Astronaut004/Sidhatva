const errorHandler = (err, req, res, next) => {
  // If the error already has a status code (like 404 or 401), use it.
  // Otherwise, default to a 500 Internal Server Error.
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message,
    success: false,
    // We only want to show the detailed error stack in development mode for debugging
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
