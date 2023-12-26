import { NextFunction, Request, Response } from "express";
import {ResponseData} from '../interface/responseData.js'
import { APIError } from "../utils/ApiError.js";
import { GetUsersService } from "../services/usersService.js";

export const GetUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.query.id
        console.log({mid: id})
        if(!id) throw new APIError('Id not specified', 400, true, '')
        // const id2 = req.params.id

        // id = 
        const d = await GetUsersService(+id)
        const result: ResponseData = {
            msg: "Users",
            data: d,
            status: 200
        };
        res.json(result);
    } catch(err) {
        console.log(err);
        next(err)
    }
}