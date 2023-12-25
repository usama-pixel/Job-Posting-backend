var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAppliedJobsService, applyJobService, createJobService, getCountriesService, getEmpTypesService, getExpService, getJobsService, getScheduleService, getTagsService, getTotalJobsService } from "../services/jobService.js";
import { APIError } from "../utils/ApiError.js";
import HttpStatusCode from "../enums/HttpStatus.js";
export const createJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { position, companyName, tags, hourlyRate, address, empTypeId, scheduleId, countryId, expId } = req.body;
        const fields = [position, companyName, hourlyRate, address, empTypeId, scheduleId, countryId, expId];
        // console.log(tags);
        const isEmpty = fields.some(field => !field || field.length === 0);
        if (isEmpty)
            throw new APIError('All fields must be filled', HttpStatusCode.BAD_REQUEST, true, '');
        const r = yield createJobService({ position, companyName, tags, hourlyRate, address, empTypeId, scheduleId, countryId, userId: req.user.id, expId });
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
    var _a;
    try {
        const { page } = req.query;
        const { lower, upper, search, location, experience, schedule, empType } = req.body;
        const token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        console.log({ token });
        if (!page)
            throw new APIError('Page not specified', HttpStatusCode.BAD_REQUEST, true, '');
        const data = yield getJobsService(+page, lower, upper, search, location, experience, schedule, empType);
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
        console.log(err);
        next(err);
    }
});
export const getCountries = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield getCountriesService();
        const response = {
            msg: 'Success',
            status: 200,
            data: countries
        };
        res.json(response);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
export const getExp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exp = yield getExpService();
        const response = {
            msg: 'Success',
            status: 200,
            data: exp
        };
        res.json(response);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
export const getTags = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield getTagsService();
        const response = {
            msg: 'Success',
            status: 200,
            data: result
        };
        res.json(response);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
export const getSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield getScheduleService();
        const response = {
            msg: 'Success',
            status: 200,
            data: result
        };
        res.json(response);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
export const getEmpTypes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield getEmpTypesService();
        const response = {
            msg: 'Success',
            status: 200,
            data: result
        };
        res.json(response);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
export const applyJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { myId, jobId } = req.body;
        console.log({ myId, jobId });
        const d = yield applyJobService(+myId, +jobId);
        const result = {
            msg: '',
            status: 200,
            data: d
        };
        res.json('yes');
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
export const getAppliedJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log({ 'req': req.query });
        const { myId } = req.query;
        if (!myId)
            throw new APIError('Id must be defined', 400);
        const d = yield getAppliedJobsService(+myId);
        console.log({ d });
        const result = {
            msg: 'abc',
            status: 200,
            data: d
        };
        res.json(result);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
//# sourceMappingURL=job.js.map