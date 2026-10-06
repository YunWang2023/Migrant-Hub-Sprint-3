const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const {
  register,
  login,
  getCurrentUser,
  logout,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, getCurrentUser);
router.post("/logout", requireAuth, logout);

module.exports = router;