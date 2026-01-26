import { Router } from "express";

import { getErrorMessage } from "../utils/errorUtils.js";
import { teacherService } from "../services/index.js";
import { renewSub } from "../services/teacherServices.js";
import checkSubscription from "../middlewares/checkSubscription.js";
import { isAuth, isGuest } from "../middlewares/authmiddleware.js";

const teacherController = Router();

teacherController.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const user = await teacherService.register(userData);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

teacherController.post(
    "/login",
    isGuest,
    checkSubscription,
    async (req, res) => {
        const userData = req.body;

        try {
            const user = await teacherService.login(userData);
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ message: getErrorMessage(err) });
        }
    },
);

teacherController.get("/logout", (req, res) => {
    res.status(204).json({ ok: true });
});

teacherController.patch("/edit-profile", isAuth, async (req, res) => {
    const teacherId = req.user.id;
    const data = req.body;
    try {
        const user = await teacherService.editCode(teacherId, data);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

teacherController.post("/renew/:teacherId", async (req, res) => {
    const teacherId = req.params.teacherId;
    try {
        const user = await renewSub(teacherId);
        res.status(200).json({
            message: "Account reactivated successfully",
            expiresAt: user.subscriptionExpiresAt,
        });
    } catch (error) {
        res.status(500).json({ message: "Reactivation failed" });
    }
});

export default teacherController;
