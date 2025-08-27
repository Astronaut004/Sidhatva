export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`Forbidden: Your role (${req.user.role}) is not authorized.`);
    }
    next();
  };
};