import { Router } from "express";
import studentController from "./controllers/studentController.js";
import animalController from "./controllers/animalController.js";
import adminController from "./controllers/adminController.js";

const routes = Router();

routes.use("/students", studentController);
routes.use("/admin", adminController);
// routes.use("/animals", animalController);

export default routes;
