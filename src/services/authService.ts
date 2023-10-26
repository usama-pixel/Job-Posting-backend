import { prisma } from "../db/db.js"
import HttpStatusCode from "../enums/HttpStatus.js"
import { APIError } from "../utils/ApiError.js"
import bcrypt from 'bcrypt'

export const createUser = async(data: {username: string, password: string}) => {
    const isUserExist = await prisma.user.findFirst({
        where: {
            username: data.username
        }
    })
    if(isUserExist) {
        throw new APIError(
            'Username already exits',
            HttpStatusCode.CONFLICT,
            true,
            `An account with username {${data.username}} already exists`
        );
    }
    const saltRounds = 10
    const hasedPassword = await bcrypt.hash(data.password, saltRounds);

    const res = await prisma.user.create({
        data: {
            username: data.password,
            password: hasedPassword
        }
    })
    return res;
}

export const loginUser = async ({username, password}: {username: string, password: string}) => {
    const user = await prisma.user.findFirst({
        where: {
            username,
        }
    })
    if(!user) {
        throw new APIError('Username does not exists', 404, true, '');
    }
    const hashedPassword = await bcrypt.compare(password, user.password)
    console.log({hashedPassword});
}