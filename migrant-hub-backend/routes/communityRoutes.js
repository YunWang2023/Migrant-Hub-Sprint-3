const express = require("express");
const router = express.Router();

const {
  getAllCommunities,
  getCommunityById,
  getCommunityPosts,
  createCommunity,
  updateCommunity,
  deleteCommunity
} = require("../controllers/communityController");

router.get("/", getAllCommunities);
router.get("/:id", getCommunityById);
router.get("/:id/posts", getCommunityPosts);

router.post("/", createCommunity);
router.patch("/:id", updateCommunity);
router.delete("/:id", deleteCommunity);

module.exports = router;