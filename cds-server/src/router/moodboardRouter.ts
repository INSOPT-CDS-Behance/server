import { Router } from "express";
import { moodboardController } from "../controller";

const router: Router = Router();




//* 무드보드 편집 - PATCH api/moodboard/:moodboardId
router.patch("/", moodboardController.updateMoodboard);


export default router;
