import { Request, Response } from "express";
import { likeService } from "../service";
import { rm, sc } from "../constants";
import { success, fail } from "../constants/response";

//좋아요 누르기
const like = async (req: Request, res: Response) => {
    const { projectId, userId } = req.body;

    //userId 일단 현재사용자로 고정, 존재하는 프로젝트인지만 확인
    if (!projectId) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NOT_FOUND))
    }

    //좋아요 눌러진 상태이면 --> 좋아요 취소하기
    const isliked = await likeService.isLiked(projectId, userId);
    if (isliked) {
        const likeHistory = await likeService.deleteLikeHistory(isliked.id); //isliked.id : 해당 projectid, userid를 갖는 likehistory테이블의 id

        const likeSum = await likeService.updateLikeSum(projectId, true);
        if (!likeSum) {
            return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NOT_FOUND))
        }

        return res.status(sc.OK).send(success(sc.OK, rm.DELETE_LIKE_SUCCESS,));
    }

    //좋아요 안눌러진 상태이면 --> 좋아요 누르기
    const likeHistory = await likeService.createLikeHistory(projectId, userId);
    if (!likeHistory) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NOT_FOUND))

    }
    const likeSum = await likeService.updateLikeSum(projectId, false);
    if (!likeSum) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NOT_FOUND))
    }

    return res.status(sc.OK).send(success(sc.OK, rm.POST_LIKE_SUCCESS,));

}

//좋아요 취소하기
// const dislike = async(req:Request, res:Response)=>{
//     const{projectId,userId} = req.body;

//     //userId 일단 현재사용자로 고정, 존재하는 프로젝트인지만 확인
//    if(!projectId){
//        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.NOT_FOUND))
//    }

//    const isliked = await likeService.isLiked(projectId,userId);
//    if(!isliked){
//    // return like;
//     return res.status(400).json({ status: 400, message: "이미 좋아요 안눌러진 상태"});
//    }
// }


const likeController = {
    like,
    //dislike
};

export default likeController;
