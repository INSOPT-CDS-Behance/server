import { Request, Response } from "express";
import { success, fail} from "../constants/response";
import message from "../constants/responseMessage";
import statusCode from "../constants/statusCode";
import { projectService } from "../service";

const getProjectDetail = async (req: Request, res: Response) => {
    const projectId = req.params.projectId;

    if (!projectId) {
        res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }
    
    const data = await projectService.getProjectDetail(+projectId);

    if (!data) {
        return res.status(statusCode.NOT_FOUND).send(fail(statusCode.NOT_FOUND, message.NOT_FOUND_PROJECTS));
    }

    const result = {
        "id": data?.id,
        "writer": data?.user.name,
        "image": data?.image,
        "isLiked": (data!.likehistory.length > 0)
    }

    return res.status(statusCode.OK).send(success(statusCode.OK, message.SUCCESS_GET_PROJECT_DETAIL, result));
}

const projectController = {
    getProjectDetail,
};

export default projectController;
