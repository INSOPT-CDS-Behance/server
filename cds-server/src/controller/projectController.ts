import { Request, Response } from "express";
import { success } from "../constants/response";
import message from "../constants/responseMessage";
import statusCode from "../constants/statusCode";
import { projectService } from "../service";

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
};

export default projectController;
