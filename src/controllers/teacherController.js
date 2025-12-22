import { Router } from "express";

import { getErrorMessage } from "../utils/errorUtils.js";
import { teacherService } from "../services/index.js";

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

teacherController.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const user = await teacherService.login(userData);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

teacherController.get("/logout", (req, res) => {
    res.status(204).json({ ok: true });
});

export default teacherController;
