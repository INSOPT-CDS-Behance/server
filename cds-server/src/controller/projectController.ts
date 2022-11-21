import { Request, Response } from "express";
import { success, fail } from "../constants/response";
import message from "../constants/responseMessage";
import statusCode from "../constants/statusCode";
import { projectService } from "../service";

const getProjectDetail = async (req: Request, res: Response) => {
    const projectId = req.params.projectId;

    try {
        if (!projectId) {
            throw "no project id"
        }
        
        const data = await projectService.getProjectDetail(+projectId);
    
        if (!data) {
            throw  "no project"
        }
    
        const result = {
            "id": data?.id,
            "writer": data?.user.name,
            "image": data?.image,
            "isLiked": (data!.likehistory.length > 0)
        }
    
        return res.status(statusCode.OK).send(success(statusCode.OK, message.SUCCESS_GET_PROJECT_DETAIL, result));
    }
    catch (error) {
        if (error == "project id null") {
            return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
        }
        else if (error == "no project") {
            return res.status(statusCode.NOT_FOUND).send(fail(statusCode.NOT_FOUND, message.NOT_FOUND_PROJECTS));
        }

        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
    
}

const getAllProjects = async (req: Request, res: Response) => {
    const data = await projectService.getAllProjects();

    const result = data.map ((item) => {
        return {
            id: item.id,
            writer: item.user.name,
            image: item.image,
            likeCount: item.likeSum,
            viewCount: item.view_count
        }
    })
    return res.status(statusCode.OK).send(success(statusCode.OK, message.SUCCESS_GET_ALL_PROJECTS, result));
}

const projectController = {
    getAllProjects,
    getProjectDetail,
};

export default projectController;
