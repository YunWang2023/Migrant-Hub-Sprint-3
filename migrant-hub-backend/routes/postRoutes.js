const express = require("express");

const router = express.Router();

const validatePost = require("../middleware/validatePost");
const requireAuth = require("../middleware/requireAuth");

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require("../controllers/postController");

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/", requireAuth, validatePost, createPost);

router.patch("/:id", requireAuth, validatePost, updatePost);

router.delete("/:id", requireAuth, deletePost);

module.exports = router;