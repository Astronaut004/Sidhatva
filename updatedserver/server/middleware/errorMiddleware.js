export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = undefined;

  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = err.errors.map(e => ({
      field: e.path,
      message: e.message,
      value: e.value,
    }));
  }
  
  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = `Duplicate value for ${err.errors[0]?.path}`;
  }

  
  if (err.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 400;
    message = `Invalid foreign key: ${JSON.stringify(err.fields)}`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
