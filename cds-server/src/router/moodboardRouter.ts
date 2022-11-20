import { Router } from "express";
import { moodboardController } from "../controller";

const router: Router = Router();

//* 무드보드 조회 API - GET /api/moodboard
router.get("/", moodboardController.getAllMoodboard);

export default router;
