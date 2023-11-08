var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createJobService, getJobsService, getTotalJobsService } from "../services/jobService.js";
import { APIError } from "../utils/ApiError.js";
import HttpStatusCode from "../enums/HttpStatus.js";
export const createJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { position, companyName, tags, hourlyRate, address } = req.body;
        const fields = [position, companyName, hourlyRate, address];
        console.log(fields);
        const isEmpty = fields.some(field => !field || field.length === 0);
        if (isEmpty)
            throw new APIError('All fields must be filled', HttpStatusCode.NOT_FOUND, true, '');
        const r = yield createJobService({ position, companyName, tags, hourlyRate, address });
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
export const getJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.query;
        const { lower, upper, search, location, schedule, empType } = req.body;
        console.log({ schedule });
        if (!page)
            throw new APIError('Page not specified', HttpStatusCode.BAD_REQUEST, true, '');
        // if(!lower) throw new APIError('Lower not specified', HttpStatusCode.BAD_REQUEST, true, '');
        // if(!upper) throw new APIError('Upper not specified', HttpStatusCode.BAD_REQUEST, true, '');
        const data = yield getJobsService(+page, lower, upper, search, location, schedule, empType);
        const response = {
            msg: 'Success',
            data: data,
            status: HttpStatusCode.OK,
        };
        res.status(HttpStatusCode.OK);
        res.json(response);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
export const getTotalJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobCount = yield getTotalJobsService();
        const response = {
            msg: 'Success',
            data: jobCount,
            status: HttpStatusCode.OK
        };
        res.status(HttpStatusCode.OK);
        res.json(response);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=job.js.map