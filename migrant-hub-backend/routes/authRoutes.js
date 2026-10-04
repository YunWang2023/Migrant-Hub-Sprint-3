const express = require("express");

const router = express.Router();

const requireAuth = require("../middleware/requireAuth");

const {
  register,
  login,
  getCurrentUser
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.get("/me", requireAuth, getCurrentUser);

module.exports = router;