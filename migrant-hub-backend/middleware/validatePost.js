const categories = [
  "Housing",
  "Paperwork",
  "Transport",
  "Food",
  "Study",
  "Community",
  "Places",
];

const validatePost = (req, res, next) => {
  const { title, body, category } = req.body;
  const errors = [];

  if (typeof title !== "string" || !title.trim()) {
    errors.push("title is required");
  } else if (title.length > 120) {
    errors.push("title exceeds 120 characters");
  }

  if (typeof body !== "string" || !body.trim()) {
    errors.push("body is required");
  } else if (body.trim().split(/\s+/).length > 512) {
    errors.push("body exceeds 512 words");
  }

  if (typeof category !== "string" || !category.trim()) {
    errors.push("category is required");
  } else if (!categories.includes(category)) {
    errors.push("invalid category");
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "Validation failed", details: errors });
  }

  next();
};

module.exports = validatePost;