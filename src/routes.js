import { Router } from "express";
import studentController from "./controllers/studentController.js";
import animalController from "./controllers/animalController.js";

const routes = Router();

routes.use("/students", studentController);
routes.use("/admins", studentController);
// routes.use("/animals", animalController);

export default routes;
