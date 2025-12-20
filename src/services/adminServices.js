import bcrypt from "bcrypt";

import { generateAuthToken } from "../utils/userUtils.js";
import Admin from "../models/Admin.js";

export async function register(userData) {
    // const email = userData.email;
    const existingUser = await Admin.findOne({ username: userData.username });
    if (existingUser) {
        throw new Error("The email already exists!");
    }

    const user = await Admin.create(userData);
    const token = generateAuthToken(user);
    return {
        accessToken: token,
        username: user.username,
        role: user.role,
        _id: user.id,
    };
}

export async function login(userData) {
    const user = await Admin.findOne({ username: userData.username });

    if (!user) {
        throw new Error("Invalid email or code!");
    }

    const isMatch = await bcrypt.compare(userData.code, user.code);
    if (!isMatch) {
        throw new Error("Invalid email or code!");
    }

    const token = generateAuthToken(user);
    return {
        accessToken: token,
        username: user.username,
        role: user.role,
        _id: user.id,
    };
}
