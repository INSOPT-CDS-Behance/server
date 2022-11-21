import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
};

export default projectService;
