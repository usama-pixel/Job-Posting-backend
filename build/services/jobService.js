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
import { itemsPerPage } from "../utils/constants.js";
export const createJobService = ({ position, companyName, tags, hourlyRate, address }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.jobs.create({
        data: {
            position,
            date: new Date(),
            company_name: companyName,
            tags: ['a', 'b'],
            hourly_rate: +hourlyRate,
            address
        }
    });
    return result;
});
export const getJobsService = (page, lower = '0', upper = '100', search, location, schedule, empType) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log({page, itemsPerPage, lower, upper});
    const where = {};
    if (+lower !== 0 || +upper !== 0) {
        where.hourly_rate = {
            gte: +lower,
            lte: +upper
        };
    }
    if (search) {
        where.position = {
            contains: search,
            mode: 'insensitive'
        };
    }
    if (location) {
        where.address = {
            contains: location,
            mode: 'insensitive'
        };
    }
    if (schedule && schedule.length > 0) {
        where.working_schedule = {
            name: {
                in: schedule
            }
        };
    }
    if (empType && empType.length > 0) {
        where.employment_type = {
            name: {
                in: empType
            }
        };
    }
    const skip = (page - 1) * itemsPerPage;
    const result = yield prisma.jobs.findMany({
        orderBy: {
            date: 'desc'
        },
        where: where,
        skip,
        take: itemsPerPage,
    });
    return result;
});
export const getTotalJobsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.jobs.count();
    return result;
});
//# sourceMappingURL=jobService.js.map