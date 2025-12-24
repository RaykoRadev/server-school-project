import { Router } from "express";
import studentController from "./controllers/studentController.js";
import tasksController from "./controllers/tasksController.js";
import teacherController from "./controllers/teacherController.js";

const routes = Router();

routes.use("/student", studentController);
routes.use("/teacher", teacherController);
routes.use("/links", tasksController);
// routes.use("/animals", animalController);

export default routes;
