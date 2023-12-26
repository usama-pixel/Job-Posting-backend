import { prisma } from "../db/db.js"

export const GetUsersService = async (myId: number) => {
    console.log({myId})
    const res = await prisma.user.findMany({
        where: {
            id: {
                not: myId
            }
        }
    })
    return res
}