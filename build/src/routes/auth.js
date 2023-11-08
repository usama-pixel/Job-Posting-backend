import { Router } from "express";
import { Login, Signup } from "../controllers/auth.js";
export const AuthRoutes = Router();
AuthRoutes.post('/signup', Signup);
AuthRoutes.post('/login', Login);
//# sourceMappingURL=auth.js.map