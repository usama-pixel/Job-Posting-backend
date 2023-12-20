import { Request, Response } from "express";
import { getMsgsService } from "../services/msgService.js";
import { ResponseData } from "../interface/responseData.js";


export async function GetMsgs(req: Request, res: Response) {
    try {
        const { toId, fromId } = req.body
        const msgs = await getMsgsService(toId, fromId)
        const response: ResponseData = {
            msg: "Msgs",
            data: msgs,
            status: 200
        }
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}