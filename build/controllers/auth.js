var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createUser } from "../services/authService.js";
import { APIError } from "../utils/ApiError.js";
export const Signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const d = yield createUser({ username: username, password: password });
            console.log({ d });
        }
        const result = {
            msg: "Signed up",
            status: 200
        };
        res.json(result);
    }
    catch (err) {
        console.log(err);
        throw new APIError('Api Error', 500, false, 'Dont know bro, some error occured');
    }
});
//# sourceMappingURL=auth.js.map