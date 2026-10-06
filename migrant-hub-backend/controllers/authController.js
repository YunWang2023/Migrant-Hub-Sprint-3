const User = require("../models/userModel");
const { createToken } = require("../utils/token");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const errors = [];

    if (typeof name !== "string" || !name.trim()) {
      errors.push("name is required");
    }

    if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.push("a valid email is required");
    }

    if (typeof password !== "string" || password.length < 8) {
      errors.push("password must be at least 8 characters");
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: "Validation failed", details: errors });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const user = await User.create({ name, email, password });
    const token = createToken(user);

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    // the same message for both cases, so the response does not reveal
    // which email addresses are registered
    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = createToken(user);

    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res) => {
  // same shape as register and login, so the frontend reads it the same way
  res.status(200).json({ user: req.user });
};

const logout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { register, login, getCurrentUser, logout };