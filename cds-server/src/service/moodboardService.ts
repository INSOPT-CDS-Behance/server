import { PrismaClient } from "@prisma/client";

//const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//*  무드보드 전체 조회
const getAllMoodboard = async () => {
    //const data = await prisma.moodboard.findMany();

    const data = await prisma.moodboard.findMany({
        include: {
            project:  {
                select: {
                    id: true,
                    image: true
                }
            }
        }
    })

    return data;
}

const moodboardService = {
    getAllMoodboard,
};

export default moodboardService;