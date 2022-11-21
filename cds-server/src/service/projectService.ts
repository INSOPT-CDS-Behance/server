import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getProjectDetail = async (projectId: number) => {
    const data = await prisma.project.findUnique({
        where: {
            id: projectId
        },
        include: {
            user: true,
            likehistory: {
                where: {
                    project_id: projectId,
                    user_id: 2
                }
            }
        }
    })
    
    return data;
}

const getAllProjects = async() => {
    const data = await prisma.project.findMany({
        include: {
            user: {
                select:{
                    name: true
                }
            }
        }
    });
    return data
}

const projectService = {
    getAllProjects,
    getProjectDetail,
};

export default projectService;
