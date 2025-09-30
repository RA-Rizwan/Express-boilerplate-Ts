import express from "express";
import { corsMiddleware } from "./middlewares/cors.middleware";
import { router } from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/errors.middleware";

export const app = express();

app.use(corsMiddleware)
app.use(express.json({ limit: "10mb" }))

app.use("/api/v1",router)




app.use(notFoundHandler);
app.use(errorHandler);

