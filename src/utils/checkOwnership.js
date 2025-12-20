import { catalogService } from "../services/index.js";
import { getErrorMessage } from "./errorUtils.js";

export default async function isOwnerF(req, res, next) {
    const reviewId = req.params.reviewId;
    const userId = req.user?.id;

    try {
        const { review } = await catalogService.getOne(reviewId, userId);
        req.review = review;
        return next();
    } catch (err) {
        return res.status(404).render("catalog/catalog", {
            error: getErrorMessage(err),
        });
    }
}
