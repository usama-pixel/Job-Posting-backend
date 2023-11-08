var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createJob as createJobService } from "../services/jobsService.js";
export const createJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { position, date, company_name, tags, hourly_rate, address } = req.body;
        const r = yield createJobService({ position, date, company_name, tags, hourly_rate, address });
        const result = {
            msg: "Job post created",
            status: 200
        };
        res.json(result);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
//# sourceMappingURL=jobs.js.map