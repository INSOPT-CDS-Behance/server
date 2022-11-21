import { Router } from "express";
import { projectController } from "../controller";

const router: Router = Router();

router.get("/:projectId", projectController.getProjectDetail);
router.get("/", projectController.getAllProjects);

export default router;
