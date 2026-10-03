const express = require("express");
const router = express.Router();

const {
  getAllMustDo,
  getMustDoBySlug,
  createMustDo,
  updateMustDo,
  deleteMustDo
} = require("../controllers/mustDoController");

router.get("/", getAllMustDo);
router.get("/:slug", getMustDoBySlug);
router.post("/", createMustDo);
router.patch("/:slug", updateMustDo);
router.delete("/:slug", deleteMustDo);

module.exports = router;