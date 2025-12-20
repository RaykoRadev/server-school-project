import jwt from "jsonwebtoken";

// import { JWT_SECRET } from "../config/constants.js";
import { getErrorMessage } from "../utils/errorUtils.js";

export function authMiddleware(req, res, next) {
    const token = req.header("X-Authorization");

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        req.isAuthenticated = true;

        return next();
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
}
