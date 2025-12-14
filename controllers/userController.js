import jwt from "jsonwebtoken";
import { signInService, signUpService, getUserById } from "../services/userService.js";


// Register
export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const data = await signInService(email, password);

        res.status(200).json({
            message: "Login successful",
            ...data
        });
    } catch (error) {
        res.status(401).json({
            message: error.message || "Login failed"
        });
    }
};

// Login
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const data = await signUpService(name, email, password);

        res.status(201).json({
            message: "Account created successfully",
            ...data
        });
    } catch (error) {
        const statusCode =
            error.message === "User already exists" ? 409 : 400;

        res.status(statusCode).json({
            message: error.message || "Signup failed"
        });
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
