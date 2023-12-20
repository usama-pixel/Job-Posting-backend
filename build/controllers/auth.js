var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createUser, loginUser } from "../services/authService.js";
import { APIError } from "../utils/ApiError.js";
export const Signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new APIError('Username or password is empty', 404, true, '');
        }
        const d = yield createUser({ username: username, password: password });
        const result = {
            msg: "Signed up",
            status: 200
        };
        res.json(result);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
export const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            console.log('error');
            throw new APIError('Username or password is empty', 404, true, '');
        }
        const data = yield loginUser({ username, password });
        const result = {
            msg: 'Login Successfull',
            data: data,
            status: 200
        };
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=auth.js.map