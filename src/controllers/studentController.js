import { Router } from "express";

import { getErrorMessage } from "../utils/errorUtils.js";
import { userService } from "../services/index.js";

const studentController = Router();

studentController.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const user = await userService.register(userData);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

studentController.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const user = await userService.login(userData);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

studentController.get("/logout", (req, res) => {
    res.status(204).json({ ok: true });
});

studentController.get("/links", async (req, res) => {
    //todo need params: teacherId and classId

    try {
        const user = await userService.getAllStudents();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

studentController.delete("/:teacherId/:studentId/delete", async (req, res) => {
    const teacherId = req.params.teacherId;
    const studentId = req.params.studentId;

    try {
        const user = await userService.deleteStudent(teacherId, studentId);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

studentController.patch("/:teacherId/:studentId/edit", async (req, res) => {
    const teacherId = req.params.teacherId;
    const studentId = req.params.studentId;
    const data = req.body;

    try {
        const user = await userService.editStudent(teacherId, studentId, data);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

studentController.get("/:teacherId/:studentId", async (req, res) => {
    const teacherId = req.params.teacherId;
    const studentId = req.params.studentId;

    try {
        const user = await userService.getOneStudent(studentId);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

export default studentController;
