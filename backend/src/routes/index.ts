import { Router, Response, Request, NextFunction } from "express";
import dutiesRoute from "./dutiesRoutes";

const api: Router = Router();

api.get("/api/health", function (req: Request, res: Response) {
  res.send("Health Check.");
});

api.use("/api/duties", dutiesRoute);

export default api;
