import jwt from "jsonwebtoken";

// import { JWT_SECRET } from "../config/constants.js";

export function generateAuthToken(user) {
    //todo check the token i need to turn back
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
