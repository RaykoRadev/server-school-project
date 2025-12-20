import bcrypt from "bcrypt";

import Student from "../models/Students.js";
import { generateAuthToken } from "../utils/userUtils.js";

export async function register(userData) {
    // const email = userData.email;
    const existingUser = await Student.findOne({ username: userData.username });
    if (existingUser) {
        throw new Error("The email already exists!");
    }

    const user = await Student.create(userData);
    const token = generateAuthToken(user);
    return {
        accessToken: token,
        username: user.username,
        role: user.role,
        _id: user.id,
    };
}

export async function login(userData) {
    const user = await Student.findOne({ username: userData.username });

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
