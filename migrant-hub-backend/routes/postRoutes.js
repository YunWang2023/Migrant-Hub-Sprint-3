const express = require("express");

const router = express.Router();

const validatePost = require("../middleware/validatePost");
const requireAuth = require("../middleware/requireAuth");

const {
  getAllPosts,
  getPostById,
  generatePostSuggestions,
  createPost,
  updatePost,
  deletePost
} = require("../controllers/postController");

router.get("/", getAllPosts);

// Generate AI suggestions without saving the post
router.post("/enrich", requireAuth, generatePostSuggestions);

// Get one post
router.get("/:id", getPostById);

// Save the final post
router.post("/", requireAuth, validatePost, createPost);

router.patch("/:id", requireAuth, validatePost, updatePost);

router.delete("/:id", requireAuth, deletePost);

module.exports = router;