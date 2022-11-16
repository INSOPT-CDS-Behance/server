import { Router } from "express";
import projectRouter from "./projectRouter";
import likeRouter from "./likeRouter";
import moodboardRouter from "./moodboardRouter";

const router: Router = Router();

router.use("/project", projectRouter);
router.use("/like", likeRouter);
router.use("/moodboard", moodboardRouter)

export default router;