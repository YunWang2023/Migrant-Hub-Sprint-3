const Post = require("../models/postModel");

// GET all posts
const getAllPosts = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.communityId) {
      filter.communityId = req.query.communityId;
    }

    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { body: { $regex: req.query.search, $options: "i" } }
      ];
    }

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(req.query.limit) || 0);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// GET one post
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        error: "Post Not found"
      });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// POST
const createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// PATCH
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!post) {
      return res.status(404).json({
        error: "Not found"
      });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// DELETE
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        error: "Not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};