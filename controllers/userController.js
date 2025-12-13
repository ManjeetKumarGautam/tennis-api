import jwt from "jsonwebtoken";
import { createUser, loginUser, getUserById } from "../services/userService.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register
export const registerUser = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login
export const loginUserController = async (req, res) => {
    try {
        const user = await loginUser(req.body);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Get Profile
export const getProfile = async (req, res) => {
    try {
        const user = await getUserById(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
