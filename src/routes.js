import { Router } from "express";
import studentController from "./controllers/studentController.js";
import tasksController from "./controllers/tasksController.js";
import teacherController from "./controllers/teacherController.js";
import initDatabase from "./config/dbConfing.js";

const routes = Router();

async function dbMiddleware(req, res, next) {
    try {
        await initDatabase(); // cached promise prevents multiple connections
        next();
    } catch (err) {
        console.error("DB connection failed:", err.message);
        res.status(500).json({ error: "Database unavailable" });
    }
}

routes.use("/student", dbMiddleware, studentController);
routes.use("/teacher", dbMiddleware, teacherController);
routes.use("/links", dbMiddleware, tasksController);

export default routes;
