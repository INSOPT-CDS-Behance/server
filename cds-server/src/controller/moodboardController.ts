import { MoodboardPatchDTO } from './../interfaces/moodboard/MoodboardPatchDTO';
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

const updateMoodboard = async ( req: Request, res: Response ) => {
    const moodboardPatchDTO: MoodboardPatchDTO = req.body;

    //if(!moodboardPatchDTO.id || !moodboardPatchDTO.is_public)
    //    return res.status(sc.NULL_VALUE).send(fail(sc.NULL_VALUE, rm.NULL_VALUE));
    //? 빈 값으로 들어오는 경우의 오류를 잡으려했는데, is_public이 boolean 형태라서
    //? !is_public은 빈 값이 아닌 true/false 값으로 필터링이 되어버림... 새로운 방법이 필요해여ㅠ

    const updateMoodboard = await moodboardService.updateMoodboard(moodboardPatchDTO);

    if(!updateMoodboard)
            return res.status(sc.MB_PATCH_FAIL).send(fail(sc.MB_PATCH_FAIL, rm.MB_PATCH_FAIL));

    return res.status(sc.OK).send(success(sc.OK, rm.MB_PATCH_SUCCESS));
}

const moodboardController = {
    getAllMoodboard,
    updateMoodboard,
};

export default moodboardController;
