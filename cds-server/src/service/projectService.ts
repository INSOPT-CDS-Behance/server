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

const projectService = {
    getProjectDetail,
};

export default projectService;
