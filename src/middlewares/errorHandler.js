import { getErrorMessage } from "../utils/errorUtils.js";

export default function globalErrorHandler(err, req, res, next) {
    const status = err.statusCode || 500;
    const message = getErrorMessage(err);

    res.status(status).json("404", { error: message });
}
