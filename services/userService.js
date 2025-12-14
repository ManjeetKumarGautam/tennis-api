import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signInService = async (email, password) => {
    if (!email || !password) {
        throw new Error("All fields required");
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    };
};

export const signUpService = async (name, email, password) => {
    if (!name || !email || !password) {
        throw new Error("All fields required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password // hashed by mongoose pre-save
    });

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    };
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        return user;
    } else {
        throw new Error("Invalid email or password");
    }
};

export const getUserById = async (id) => {
    const user = await User.findById(id).select("-password");
    if (!user) throw new Error("User not found");
    return user;
};
