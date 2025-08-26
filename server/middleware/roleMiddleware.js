// This middleware factory checks if the logged-in user has one of the required roles.
const authorize = (...roles) => {
  return (req, res, next) => {
    // The `protect` middleware should have already attached the user to the request.
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403); // 403 Forbidden
      throw new Error(`Forbidden: Your role (${req.user.role}) is not authorized to access this resource.`);
    }
    next(); // User has the required role, proceed to the next function.
  };
};

module.exports = { authorize };
