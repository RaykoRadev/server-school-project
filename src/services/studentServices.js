import bcrypt from "bcrypt";

import { generateAuthToken } from "../utils/userUtils.js";
import Student from "../models/Students.js";
import Teacher from "../models/Teacher.js";

export async function register(userData) {
    // const email = userData.email;
    const existingUser = await Student.findOne({ username: userData.username });
    if (existingUser) {
        throw new Error("The username already exists!");
    }

    const user = await Student.create(userData);
    const token = generateAuthToken(user);
    return {
        accessToken: token,
        username: user.username,
        code: user.code,
        role: user.role,
        _id: user.id,
        teacherId: user.teacherId,
        classId: user.classId,
    };
}

export async function login(userData) {
    const user = await Student.findOne({ username: userData.username });

    if (!user) {
        throw new Error("Invalid username or code!");
    }

    //* If hashing in DB is needed swithe the bottom 2 rows
    // const isMatch = await bcrypt.compare(userData.code, user.code);
    const isMatch = userData.code === user.code;
    if (!isMatch) {
        throw new Error("Invalid username or code!");
    }

    console.log(user);
    const token = generateAuthToken(user);
    return {
        accessToken: token,
        username: user.username,
        role: user.role,
        _id: user.id,
        teacherId: user.teacherId,
        classId: user.classId,
    };
}

export async function getAll(params) {
    const data = await Teacher.findOne(
        {
            _id: Student.teacherId,
            "classes.classId": Student.classId,
        },
        {
            "classes.$": 1,
        }
    );

    return data;
}
