import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtils.js";
import { tasksService } from "../services/index.js";
import mongoose from "mongoose";

const tasksController = Router();

tasksController.get("/getAllClasses/:teacherId", async (req, res) => {
    const teacherId = req.user.id;
    console.log("req: ", req.user.id);

    try {
        const data = await tasksService.getAllClasses(teacherId);
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

tasksController.get("/getOneClass/:teacherId/:classId", async (req, res) => {
    const teacherId = req.params.teacherId;
    const classId = req.params.classId;
    console.log("req: ", req.user.id);

    try {
        const data = await tasksService.getOneClass(teacherId, classId);
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

tasksController.delete(
    "/:classId/:subjectId/:linkId/delete",
    async (req, res) => {
        const teacherId = req.user.id;
        const classId = req.params.classId;
        const subjectId = req.params.subjectId;
        const linkId = req.params.linkId;

        try {
            const link = await tasksService.deleteOne(
                teacherId,
                classId,
                subjectId,
                linkId,
            );
            if (link.modifiedCount === 0) {
                return res.status(404).json({ message: "linkNotFound" });
            }

            res.status(200).json({ message: "sucDelLink" });
        } catch (err) {
            res.status(400).json({ message: getErrorMessage(err) });
        }
    },
);

tasksController.get(
    "/getOneLink/:classId/:subjectId/:linkId",
    async (req, res) => {
        const teacherId = new mongoose.Types.ObjectId(req.user.id);
        const classId = new mongoose.Types.ObjectId(req.params.classId);
        const subjectId = new mongoose.Types.ObjectId(req.params.subjectId);
        const linkId = new mongoose.Types.ObjectId(req.params.linkId);

        // console.log("teacherId: ", teacherId);
        // console.log("classId: ", classId);
        // console.log("subId: ", subjectId);
        // console.log("linkId: ", linkId);

        try {
            const link = await tasksService.getOneLink(
                teacherId,
                classId,
                subjectId,
                linkId,
            );

            if (!link) {
                return res.status(404).json({ message: "linkNotFound" });
            }

            res.status(200).json(link);
        } catch (err) {
            res.status(400).json({ message: getErrorMessage(err) });
        }
    },
);

tasksController.put("/:classId/:subjectId/:linkId/edit", async (req, res) => {
    const teacherId = req.user.id;
    const linkId = req.params.linkId;
    const data = req.body;

    try {
        const link = await tasksService.editOneLink(teacherId, linkId, data);

        res.status(200).json(link);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

export default tasksController;

//sugdestet links
// POST   /teacher/classes/:classId/subjects/:subject/links
// PATCH  /teacher/classes/:classId/subjects/:subject/links/:linkId
// DELETE /teacher/classes/:classId/subjects/:subject/links/:linkId
