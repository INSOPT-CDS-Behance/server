import { sc } from "../constants";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createLikeHistory =async (projectId:number, userId:number) => {
    try{
    const data = await prisma.likehistory.create({
        data:{
            project_id: projectId,
            user_id: userId
        },
       
    });

    if(!data){
        return sc.NOT_FOUND;
    }
    return data;
    }catch(error){
        console.log(error);
        throw error;
    }
};

const updateLikeSum = async(projectId:number)=>{
    const likedProject = await prisma.project.findUnique({
        where:{
            id:projectId
        }
    });
    const data = await prisma.project.update({
        where:{
            id: projectId
        },
        data:{
            likeSum: likedProject.likeSum + 1,
        }
    });
    return data;

}



const likeService = {
    createLikeHistory,
    updateLikeSum
};

export default likeService;
