function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  // in case of mongoose schema error
  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  }

  // in case of unAuthentication access
  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Token not valid." });
  }

  // other error handler add here if need

  return res.status(500).json({ message: err.message });
}

module.exports = {
  errorHandler,
};
