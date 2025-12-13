import User from "../models/UserModel.js";

export const createUser = async ({ name, email, password }) => {
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");

    const user = await User.create({ name, email, password });
    return user;
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
