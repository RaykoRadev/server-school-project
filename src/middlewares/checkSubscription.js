import Teacher from "../models/Teacher.js";
import { getErrorMessage } from "../utils/errorUtils.js";

export default function checkSubscription(req, res, next) {
    // console.log("SUB middleware start");

    const user = req.user;
    const now = new Date();

    if (user?.role === "teacher") {
        if (now > new Date(user.subscriptionExpiresAt)) {
            throw new Error("subExpired");
        }
    }

    next();
}
