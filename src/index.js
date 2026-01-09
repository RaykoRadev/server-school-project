import express from "express";
import cors from "cors";
import "dotenv/config";

import routes from "./routes.js";
import initDatabase from "./config/dbConfing.js";
import { authMiddleware } from "./middlewares/authmiddleware.js";
import globalErrorHandler from "./middlewares/errorHandler.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
    initDatabase();
}

app.use(cors());

app.use(express.json());

app.use(authMiddleware);

app.use(routes);

app.use(globalErrorHandler);

app.listen(
    process.env.PORT,
    console.log("Server is listening on http://localhost:3000...")
);
