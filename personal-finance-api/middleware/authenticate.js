const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // Returns a 401 error if the user is not authenticated
  return res.status(401).json({ message: "Unauthorized. Please login first." });
};

module.exports = { isAuthenticated };

