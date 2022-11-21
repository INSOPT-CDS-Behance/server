import { Router } from "express";
import { projectController } from "../controller";

const router: Router = Router();

router.get("/:projectId", projectController.getProjectDetail);

export default router;
