import { Router } from "express";
import { Signup } from "../controllers/auth.js";
export const AuthRoutes = Router();
AuthRoutes.post('/signup', Signup);
//# sourceMappingURL=auth.js.map