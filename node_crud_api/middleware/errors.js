function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    return res.status(400).json({ message: err });
  }

  // in case of mongoose schema error
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  // other error handler add here if need

  return res.status(500).json({ message: error.message });
}

module.exports = { errorHandler };
