const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const validatePost = require("../middleware/validatePost");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  generatePostSuggestions,
} = require("../controllers/postController");

router.post("/enrich", requireAuth, generatePostSuggestions);

router.get("/", getAllPosts);
router.get("/:id", getPostById);

router.post("/", requireAuth, validatePost, createPost);

router.patch("/:id", requireAuth, updatePost);

router.delete("/:id", requireAuth, deletePost);

module.exports = router;