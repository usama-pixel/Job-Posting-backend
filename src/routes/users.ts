import { Router } from "express";
import { GetUsers } from "../controllers/users.js";

export const userRouter = Router()

userRouter.get('/users', GetUsers)
