import { MoodboardPatchDTO } from './../interfaces/moodboard/MoodboardPatchDTO';
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateMoodboard = async (MoodboardPatchDTO: MoodboardPatchDTO) => {
    const data = await prisma.moodboard.update({
        where: {
            id: MoodboardPatchDTO.id
        },
        data: {
            is_public: MoodboardPatchDTO.is_public
        }
    });
    return data;
}

const moodboardService = {
  
    updateMoodboard
};

export default moodboardService;
