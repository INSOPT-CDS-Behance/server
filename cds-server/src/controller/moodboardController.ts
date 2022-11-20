import { Request, Response } from "express";
import { moodboardService } from "../service";
import { rm, sc } from "../constants"
import { success, fail } from  "../constants/response"


//* 무드보드 조회
const getAllMoodboard = async (req: Request, res: Response) => {
    const data  = await moodboardService.getAllMoodboard();
    if (!data) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST))
    }
    return res.status(sc.OK).send(success(sc.OK, rm.GET_MOODBOARD_SUCCESS, data))
}



const moodboardController = {
    getAllMoodboard,
};

export default moodboardController;
