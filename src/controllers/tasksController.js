import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtils.js";
import { tasksService } from "../services/index.js";

const tasksController = Router();

tasksController.get("/getAllClasses", async (req, res) => {
    const teacherId = req.user.id;
    console.log("req: ", req.user.id);

    try {
        const data = await tasksService.getAllClasses(teacherId);
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

tasksController.get("/getAllStudents", async (req, res) => {
    const teacherId = req.user.id;
    console.log("req: ", req.user.id);

    try {
        const data = await tasksService.getAllStudents(teacherId);
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

//creating links
tasksController.post("/createLink", async (req, res) => {
    if (req.user.role !== "teacher") {
        throw new Error("Forbidden");
    }
    try {
        const data = req.body;
        const link = await tasksService.createOne(data);
        res.json(link);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

export default tasksController;

//sugdestet links
// POST   /teacher/classes/:classId/subjects/:subject/links
// PATCH  /teacher/classes/:classId/subjects/:subject/links/:linkId
// DELETE /teacher/classes/:classId/subjects/:subject/links/:linkId
