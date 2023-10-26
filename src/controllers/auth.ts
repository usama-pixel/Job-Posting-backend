import { NextFunction, Request, Response } from "express";
import {ResponeData} from '../interface/responseData.js'
import { createUser } from "../services/authService.js"; 
import { APIError } from "../utils/ApiError.js";

export const Signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body
        if(username && password) {
            const d = await createUser({username: username, password: password})
            console.log({d});
        }
        const result: ResponeData = {
            msg: "Signed up",
            status: 200
        };
        res.json(result);
    } catch(err) {
        console.log(err);
        
        throw new APIError(
            'Api Error',
            500,
            false,
            'Dont know bro, some error occured'
        )
    }
}