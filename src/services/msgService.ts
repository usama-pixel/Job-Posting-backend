import { prisma } from "../db/db.js"

export const saveMsgService = async (msg: string, from: number, to: number) => {
    try {
        const res = await prisma.msgs.create({
            data: {
                msg,
                from,
                to
            }
        })
        return res
    } catch (error) {
        console.log(error);
    }
}

export const getMsgsService = async (to: number, from: number) => {
    const res = await prisma.msgs.findMany({
        where: {
            OR: [
                
                {
                    to,
                    from
                },
                {
                    to: from,
                    from: to
                }
            ]
        }
    })
    return res
}