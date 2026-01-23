import bcrypt from "bcrypt";

import { generateAuthToken } from "../utils/userUtils.js";
import Teacher from "../models/Teacher.js";

// const defaultSubjects = [
//     { name: "bg", links: [], visualizationName: 'Български език и Литература' },
//     { name: "math", links: [], visualizationName: 'Математика' },
//     { name: "eng", links: [], visualizationName: 'Английски език' },
// ];

export async function register(userData) {
    // const email = userData.email;
    const existingUser = await Teacher.findOne({ username: userData.username });
    if (existingUser) {
        throw new Error("usernameExist");
    }

    const user = await Teacher.create({
        username: userData.username,
        code: userData.code,
        classes: [
            {
                name: "class1",
                subjects: [
                    {
                        name: "bg",
                        links: [],
                        visualizationName: "Български език и Литература",
                    },
                    {
                        name: "math",
                        links: [],
                        visualizationName: "Математика",
                    },
                    {
                        name: "eng",
                        links: [],
                        visualizationName: "Английски език",
                    },
                    { name: "music", links: [], visualizationName: "Музика" },
                    {
                        name: "technology",
                        links: [],
                        visualizationName: "Технологии и предприемачество",
                    },
                    {
                        name: "physicalExercises",
                        links: [],
                        visualizationName: "ФВС",
                    },
                    {
                        name: "rodinoznanie",
                        links: [],
                        visualizationName: "Родинознание",
                    },
                ],
            },
            {
                name: "class2",
                subjects: [
                    {
                        name: "bg",
                        links: [],
                        visualizationName: "Български език и Литература",
                    },
                    {
                        name: "math",
                        links: [],
                        visualizationName: "Математика",
                    },
                    {
                        name: "eng",
                        links: [],
                        visualizationName: "Английски език",
                    },
                    { name: "music", links: [], visualizationName: "Музика" },
                    {
                        name: "technology",
                        links: [],
                        visualizationName: "Технологии и предприемачество",
                    },
                    {
                        name: "physicalExercises",
                        links: [],
                        visualizationName: "ФВС",
                    },
                    {
                        name: "rodinoznanie",
                        links: [],
                        visualizationName: "Родинознание",
                    },
                ],
            },
            {
                name: "class3",
                subjects: [
                    {
                        name: "bg",
                        links: [],
                        visualizationName: "Български език и Литература",
                    },
                    {
                        name: "math",
                        links: [],
                        visualizationName: "Математика",
                    },
                    {
                        name: "eng",
                        links: [],
                        visualizationName: "Английски език",
                    },
                    { name: "music", links: [], visualizationName: "Музика" },
                    {
                        name: "technology",
                        links: [],
                        visualizationName: "Технологии и предприемачество",
                    },
                    {
                        name: "physicalExercises",
                        links: [],
                        visualizationName: "ФВС",
                    },
                    {
                        name: "human&nature",
                        links: [],
                        visualizationName: "Човекът и природата",
                    },
                    {
                        name: "human&society",
                        links: [],
                        visualizationName: "Човекът и обществото",
                    },
                ],
            },
            {
                name: "class4",
                subjects: [
                    {
                        name: "bg",
                        links: [],
                        visualizationName: "Български език и Литература",
                    },
                    {
                        name: "math",
                        links: [],
                        visualizationName: "Математика",
                    },
                    {
                        name: "eng",
                        links: [],
                        visualizationName: "Английски език",
                    },
                    { name: "music", links: [], visualizationName: "Музика" },
                    {
                        name: "technology",
                        links: [],
                        visualizationName: "Технологии и предприемачество",
                    },
                    {
                        name: "physicalExercises",
                        links: [],
                        visualizationName: "ФВС",
                    },
                    {
                        name: "human&nature",
                        links: [],
                        visualizationName: "Човекът и природата",
                    },
                    {
                        name: "human&society",
                        links: [],
                        visualizationName: "Човекът и обществото",
                    },
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
        throw new Error("invalidUsernameOrPassword");
    }

    const isMatch = await bcrypt.compare(userData.code, user.code);
    if (!isMatch) {
        throw new Error("invalidUsernameOrPassword");
    }

    const token = generateAuthToken(user);
    return {
        accessToken: token,
        username: user.username,
        role: user.role,
        _id: user.id,
        subscriptionExpiresAt: user.subscriptionExpiresAt,
        status: user.subscriptionStatus,
        classesIds: {
            class1: user.classes[0].classId,
            class2: user.classes[1].classId,
            class3: user.classes[2].classId,
            class4: user.classes[3].classId,
        },
    };
}

export async function editCode(id, userData) {
    const user = await Teacher.findById(id);

    const isMatch = await bcrypt.compare(userData.oldCode, user.code);

    if (!isMatch) {
        throw new Error("codeMissmacths");
    }

    user.code = userData.code;
    await user.save();

    return {
        username: user.username,
        role: user.role,
        _id: user.id,
        subscriptionExpiresAt: user.subscriptionExpiresAt,
        classesIds: {
            class1: user.classes[0].classId,
            class2: user.classes[1].classId,
            class3: user.classes[2].classId,
            class4: user.classes[3].classId,
        },
    };
}

export async function renewSub(teacherId) {
    const user = await Teacher.findById(teacherId);

    const now = new Date();
    const currentExpDate = user.subscriptionExpiresAt || now;
    const newExpiration = new Date(
        Math.max(currentExpDate.getTime(), now.getTime()),
    );

    // newExpiration.setDate(newExpiration.getDate() + 1); // the number is with how many days to be extended the subscription
    newExpiration.setFullYear(newExpiration.getFullYear() + 1);
    user.subscriptionExpiresAt = newExpiration;
    user.subscriptionStatus = "active";

    await user.save();
    return user;
}
