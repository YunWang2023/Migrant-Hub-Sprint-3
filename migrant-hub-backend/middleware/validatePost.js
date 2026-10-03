const validatePost = (req, res, next) => {
  const { title, body, author, category } = req.body;

  const errors = [];

  // title
  if (!title) {
    errors.push("title is required");
  } else if (title.length > 120) {
    errors.push("title exceeds 120 characters");
  }

  // body
  if (!body) {
    errors.push("body is required");
  } else {
    const wordCount = body.trim().split(/\s+/).length;

    if (wordCount > 512) {
      errors.push("body exceeds 512 words");
    }
  }

  // author
  if (!author) {
    errors.push("author is required");
  }

  // category
  const validCategories = [
    "Housing",
    "Paperwork",
    "Transport",
    "Food",
    "Study",
    "Community",
    "Places"
  ];

  if (!category) {
    errors.push("category is required");
  } else if (!validCategories.includes(category)) {
    errors.push("invalid category");
  }

  // return validation errors
  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors
    });
  }

  next();
};

module.exports = validatePost;