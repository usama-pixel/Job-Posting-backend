import { prisma } from "../db/db.js"
// const
export const createUser = async(data: {username: string, password: string}) => {
    const res = await prisma.user.create({
        data: {
            username: data.password,
            password: data.password
        }
    })
    return res;
}