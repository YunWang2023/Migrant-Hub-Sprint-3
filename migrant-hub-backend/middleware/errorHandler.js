const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Bad input"
    });
  }

  res.status(500).json({
    error: "Server error"
  });
};

module.exports = errorHandler;