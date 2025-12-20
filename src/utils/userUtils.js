import jwt from "jsonwebtoken";

// import { JWT_SECRET } from "../config/constants.js";

export function generateAuthToken(user) {
    const payload = {
        email: user.email,
        username: user.username,
        id: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });

    return token;
}
