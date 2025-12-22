import bcrypt from "bcrypt";

import { generateAuthToken } from "../utils/userUtils.js";
import Teacher from "../models/Teacher.js";

const defaultSubjects = [
    { name: "bg", links: [] },
    { name: "math", links: [] },
    { name: "eng", links: [] },
];

export async function register(userData) {
    // const email = userData.email;
    const existingUser = await Teacher.findOne({ username: userData.username });
    if (existingUser) {
        throw new Error("The email already exists!");
    }

    const user = await Teacher.create({
        username: userData.username,
        code: userData.code,
        classes: [
            {
                name: "class1",
                subjects: [
                    { name: "bg", links: [] },
                    { name: "math", links: [] },
                    { name: "eng", links: [] },
                    { name: "music", links: [] },
                    { name: "technology", links: [] },
                    { name: "physicalExercises", links: [] },
                    { name: "rodinoznanie", links: [] },
                ],
            },
            {
                name: "class2",
                subjects: [
                    { name: "bg", links: [] },
                    { name: "math", links: [] },
                    { name: "eng", links: [] },
                    { name: "music", links: [] },
                    { name: "technology", links: [] },
                    { name: "physicalExercises", links: [] },
                    { name: "rodinoznanie", links: [] },
                ],
            },
            {
                name: "class3",
                subjects: [
                    { name: "bg", links: [] },
                    { name: "math", links: [] },
                    { name: "eng", links: [] },
                    { name: "music", links: [] },
                    { name: "technology", links: [] },
                    { name: "physicalExercises", links: [] },
                    { name: "human&nature", links: [] },
                    { name: "human&society", links: [] },
                ],
            },
            {
                name: "class4",
                subjects: [
                    { name: "bg", links: [] },
                    { name: "math", links: [] },
                    { name: "eng", links: [] },
                    { name: "music", links: [] },
                    { name: "technology", links: [] },
                    { name: "physicalExercises", links: [] },
                    { name: "human&nature", links: [] },
                    { name: "human&society", links: [] },
                ],
            },
        ],
    });
    const token = generateAuthToken(user);

    console.log("teacher: ", user);
    return {
        accessToken: token,
        username: user.username,
        role: user.role,
        _id: user.id,
        class1: user.classes[0],
        class2: user.classes[1],
        class3: user.classes[2],
        class4: user.classes[3],
    };
}

export async function login(userData) {
    const user = await Teacher.findOne({ username: userData.username });

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
        class1: user.classes[0],
        class2: user.classes[1],
        class3: user.classes[2],
        class4: user.classes[3],
    };
}
