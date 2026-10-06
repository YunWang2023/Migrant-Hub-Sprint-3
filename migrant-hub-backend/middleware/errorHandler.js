const errorHandler = (err, req, res, next) => {
  // A bad id or a broken schema rule is the client's mistake, not a
  // crash, so log one line instead of a full stack trace. Anything
  // unexpected still gets the whole error.
  const expected =
    err.name === "CastError" ||
    err.name === "ValidationError" ||
    err.code === 11000;

  if (expected) {
    console.log(`${req.method} ${req.originalUrl} - ${err.name}: ${err.message}`);
  } else {
    console.error(err);
  }

  // a malformed MongoDB id
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Bad input" });
  }

  // a schema rule was broken
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation failed",
      details: Object.values(err.errors).map((item) => item.message),
    });
  }

  // a unique field already exists
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "value";
    return res.status(409).json({ error: `That ${field} is already taken` });
  }

  res.status(500).json({ error: "Server error" });
};

module.exports = errorHandler;