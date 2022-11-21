import { MoodboardPatchDTO } from './../interfaces/moodboard/MoodboardPatchDTO';
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { rm, sc } from "../constants"
import { fail } from  "../constants/response"
import { Response } from "express";

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

const updateMoodboard = async (MoodboardPatchDTO: MoodboardPatchDTO) => {
    try {
        const data = await prisma.moodboard.update({
            where: {
                id: MoodboardPatchDTO.id
            },
            data: {
                is_public: MoodboardPatchDTO.is_public
            }
        });
        return data;
    } catch(error) {
        //console.log(error);
        //throw error;
        return rm.NULL_VALUE
    }
}

const moodboardService = {
    getAllMoodboard,
    updateMoodboard,
};

export default moodboardService;