import { Router } from "express";
import { projectController } from "../controller";

const router: Router = Router();

router.get("/", projectController.getAllProjects);


export default router;
