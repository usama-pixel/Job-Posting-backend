import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/db.js";
import { AuthenticatedRequest } from "../interface/AuthenticatedRequest.js";

export const getUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    // console.log({token});
    try {
        const decoded: any = jwt.verify(token as string, process.env.SECRET_KEY as string    )
        console.log({abc: decoded?.id});
        const user = await prisma.user.findFirst({
            where: {
                id: +decoded.id
            }
        })
        req.user = user
        console.log({user});
    } catch(err) {
        console.log("----------------------------> yoooooo error");
        console.log(err);
        next(err)
    }
    next();
}