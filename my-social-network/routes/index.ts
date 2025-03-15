import { Router, Request, Response } from "express";
import apiRoutes from "./api";

const router = Router();

router.use("/api", apiRoutes);

router.use((_req: Request, res: Response) => {
  res.status(404).send("404 Not Found");
});

export default router;
