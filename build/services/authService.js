var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from "../db/db.js";
import HttpStatusCode from "../enums/HttpStatus.js";
import { APIError } from "../utils/ApiError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma.user.findFirst({
        where: {
            username: data.username
        }
    });
    if (isUserExist) {
        throw new APIError('Username already exits', HttpStatusCode.CONFLICT, true, `An account with username {${data.username}} already exists`);
    }
    const saltRounds = 10;
    const hasedPassword = yield bcrypt.hash(data.password, saltRounds);
    const res = yield prisma.user.create({
        data: {
            username: data.password,
            password: hasedPassword
        }
    });
    return res;
});
export const loginUser = ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield prisma.user.findFirst({
        where: {
            username,
        }
    });
    if (!user) {
        throw new APIError('Username does not exists', 404, true, '');
    }
    const hashedPassword = yield bcrypt.compare(password, user.password);
    const token = jwt.sign({ id: (_a = user.id) === null || _a === void 0 ? void 0 : _a.toString(), name: user.username }, 'SECRET_KEY', {
        expiresIn: '2 days',
    });
    return { token, id: user.id, username: user.username };
    // return {user: {id: user.id, username: user.username}, token }
    // const token = jwt.sign(
    //     {
    //         id: user.id?.toString(),
    //         name: user.username
    //     },
    //     'secret',
    //     {
    //         algorithm: '',
    //         expires
    //     }
    // )
});
//# sourceMappingURL=authService.js.map