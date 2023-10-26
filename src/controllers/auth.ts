import { NextFunction, Request, Response } from "express";
import {ResponeData} from '../interface/responseData.js'
import { createUser, loginUser } from "../services/authService.js"; 
import { APIError } from "../utils/ApiError.js";

export const Signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body
        if(!username || !password) {
            throw new APIError('Username or password is empty', 404, true, '');
        }
        const d = await createUser({username: username, password: password})
        // console.log({d});
        const result: ResponeData = {
            msg: "Signed up",
            status: 200
        };
        res.json(result);
    } catch(err) {
        console.log(err);
        next(err)
    }
}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body
        if(!username || !password) {
            throw new APIError('Username or password is empty', 404, true, '');
        }
        const d = await loginUser({username, password})
        const result: ResponeData = {msg: 'Login Successfull', status: 200}
        res.json(result)
    } catch(err) {
        next(err)
    }
}