const User = require("../models/userModel");

const { createToken } = require("../utils/token");

// REGISTER
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                error: "Email already registered"
            });
        }

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

// LOGIN
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !(await user.checkPassword(password))) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const token = createToken(user);

        res.status(200).json({
            user,
            token
        });
    } catch (error) {
        next(error);
    }
};

// GET CURRENT USER
const getCurrentUser = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
};

// LOGOUT
const logout = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    getCurrentUser,
    logout
};
