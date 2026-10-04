const getAllPosts = (req, res) => {
  res.json([]);
};

const getPostById = (req, res) => {
  res.json({ id: req.params.id });
};

const createPost = (req, res) => {
  res.status(201).json(req.body);
};

const updatePost = (req, res) => {
  res.json({
    id: req.params.id,
    ...req.body
  });
};

const deletePost = (req, res) => {
  res.status(204).send();
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};