const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const {
  getAllCommunities,
  getCommunityById,
  getCommunityPosts,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} = require("../controllers/communityController");

// reading is public
router.get("/", getAllCommunities);
router.get("/:id", getCommunityById);
router.get("/:id/posts", getCommunityPosts);


router.post("/", requireAuth, createCommunity);
router.patch("/:id", requireAuth, updateCommunity);
router.delete("/:id", requireAuth, deleteCommunity);

module.exports = router;