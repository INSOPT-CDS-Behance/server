import { rm } from "../constants";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createLikeHistory = async (projectId: number, userId: number) => {
    try{
        const data = await prisma.likehistory.create({
            data: {
                project_id: projectId,
                user_id: userId
            }
        });
        return data;
    }
    catch(error){
        console.log(error);
        return rm.INTERNAL_SERVER_ERROR;
    }
};


const deleteLikeHistory = async (likeId: number) => {
    const data = await prisma.likehistory.delete({
        where: {
            id: likeId,
        },

    });
};


const updateLikeSum = async (projectId: number, isliked: boolean) => {
    let likes;
    const likedProject = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    });

    if (isliked) { //좋아요 눌러져있는 경우
        likes = likedProject.likeSum - 1;
    }
    else {  //좋아요 안눌러져있는 경우
        likes = likedProject.likeSum + 1;
    }

    const data = await prisma.project.update({
        where: {
            id: projectId
        },
        data: {
            likeSum: likes,
        }
    });

    return data;

};


const isLiked = async (projectId: number, userId: number) => {
    try{
        const isliked = await prisma.likehistory.findFirst({
            where: {
                project_id: projectId,
                user_id: userId,
            }
        });
        return isliked;
    }
    catch(error){
        console.log(error);
        return rm.INTERNAL_SERVER_ERROR;
    }
};


const likeService = {
    createLikeHistory,
    deleteLikeHistory,
    updateLikeSum,
    isLiked
};


export default likeService;
