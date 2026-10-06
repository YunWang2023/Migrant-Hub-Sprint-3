const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const {
  getAllMustDo,
  getMustDoBySlug,
  createMustDo,
  updateMustDo,
  deleteMustDo,
} = require("../controllers/mustDoController");

// reading is public
router.get("/", getAllMustDo);
router.get("/:slug", getMustDoBySlug);
router.post("/", requireAuth, createMustDo);
router.patch("/:slug", requireAuth, updateMustDo);
router.delete("/:slug", requireAuth, deleteMustDo);

module.exports = router;