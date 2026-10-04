const User = require("../models/userModel");

const { createToken } = require("../utils/token");

// REGISTER
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password
    });

    const token = createToken(user);

    res.status(201).json({
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register
};