import { Router } from "express";

import { getErrorMessage } from "../utils/errorUtils.js";
import { adminService } from "../services/index.js";

const studentController = Router();

studentController.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const user = await adminService.register(userData);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

studentController.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const user = await adminService.login(userData);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

studentController.get("/logout", (req, res) => {
    res.status(204).json({ ok: true });
});

export default studentController;
