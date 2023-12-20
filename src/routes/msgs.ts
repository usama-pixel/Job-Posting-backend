import { Router } from "express";
import { GetMsgs } from "../controllers/msgs.js";

export const msgsRouter = Router()

msgsRouter.post('/msgs', GetMsgs)
