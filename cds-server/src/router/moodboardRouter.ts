import { Router } from "express";
import { moodboardController } from "../controller";

const router: Router = Router();

//* 무드보드 조회 API - GET /api/moodboard
router.get("/", moodboardController.getAllMoodboard);



//* 무드보드 편집 - PATCH api/moodboard
router.patch("/", moodboardController.updateMoodboard);


export default router;
