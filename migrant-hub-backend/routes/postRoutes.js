const express = require("express");
const router = express.Router();

const validatePost = require("../middleware/validatePost");

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require("../controllers/postController");

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", validatePost, createPost);
router.patch("/:id", validatePost, updatePost);
router.delete("/:id", deletePost);

module.exports = router;