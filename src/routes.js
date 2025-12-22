import { Router } from "express";
import studentController from "./controllers/studentController.js";
import subjectController from "./controllers/subjectController.js";
import teacherController from "./controllers/teacherController.js";

const routes = Router();

routes.use("/student", studentController);
routes.use("/admin", teacherController);
routes.use("/links", subjectController);
// routes.use("/animals", animalController);

export default routes;
