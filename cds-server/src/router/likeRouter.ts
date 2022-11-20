import { Router } from "express";
import { likeController } from "../controller";

const router: Router = Router();

//api/project/like
router.post("/like",likeController.like);
//router.delete("/like",likeController.dislike);

export default router;
