import { Router } from "express";

import { getErrorMessage } from "../utils/errorUtils.js";
import { studentService } from "../services/index.js";
import checkSubscription from "../middlewares/checkSubscription.js";
import { isAuth, isGuest } from "../middlewares/authmiddleware.js";

const studentController = Router();

studentController.post("/register", isAuth, async (req, res) => {
    const userData = req.body;

    try {
        const user = await studentService.register(userData);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

studentController.post("/login", isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const user = await studentService.login(userData);
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
        const user = await studentService.getAllStudents();
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

studentController.get("/getAllAvatars", async (req, res) => {
    try {
        const avatars = await studentService.getAllAvatars();
        res.status(200).json(avatars);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

studentController.get("/getOneAvatar/:avatarId", isAuth, async (req, res) => {
    const id = req.params.avatarId;
    // console.log(id);
    try {
        const avatar = await studentService.getOneAvatar(id);
        res.status(200).json(avatar);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

studentController.patch(
    "/getOneAvatar/:studentId/edit",
    isAuth,
    async (req, res) => {
        const id = req.user.id;
        const data = req.body;
        // console.log(id);
        // console.log(data);
        try {
            const avatar = await studentService.updateAvatar(id, data);
            res.status(200).json(avatar);
        } catch (err) {
            res.status(400).json({ message: getErrorMessage(err) });
        }
    },
);

//* has to be in the bottom
studentController.delete(
    "/:teacherId/:studentId/delete",
    isAuth,
    async (req, res) => {
        const teacherId = req.params.teacherId;
        const studentId = req.params.studentId;

        try {
            const user = await studentService.deleteStudent(
                teacherId,
                studentId,
            );
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ message: getErrorMessage(err) });
        }
    },
);

studentController.patch(
    "/:teacherId/:studentId/edit",
    isAuth,
    async (req, res) => {
        const teacherId = req.params.teacherId;
        const studentId = req.params.studentId;
        const data = req.body;

        try {
            const user = await studentService.editStudent(
                teacherId,
                studentId,
                data,
            );
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ message: getErrorMessage(err) });
        }
    },
);

studentController.get("/:teacherId/:studentId", isAuth, async (req, res) => {
    const teacherId = req.params.teacherId;
    const studentId = req.params.studentId;

    try {
        const user = await studentService.getOneStudent(studentId);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

export default studentController;
