import { NextFunction, Request, Response } from "express";
import { createJobService, getJobsService, getTotalJobsService  } from "../services/jobService.js";
import {ResponseData} from '../interface/responseData.js'
import { APIError } from "../utils/ApiError.js";
import HttpStatusCode from "../enums/HttpStatus.js";
import { EmploymentTypeName, WorkingScheduleName } from "@prisma/client";

export const createJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {position, companyName, tags, hourlyRate, address} = req.body
        const fields = [position, companyName, hourlyRate, address]
        console.log(fields);
        
        const isEmpty = fields.some(field => !field || field.length === 0)

        if(isEmpty) throw new APIError('All fields must be filled', HttpStatusCode.NOT_FOUND, true, '');

        const r = await createJobService({position, companyName, tags, hourlyRate, address})
        const result: ResponseData = {
            msg: "Job post created",
            status: 200
        }
        res.json(result)
    } catch(err) {
        console.log(err)
        next(err)
    }
}

export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page } = req.query
        const { lower, upper, search, location, schedule, empType } = req.body
        console.log({schedule});
        
        if(!page) throw new APIError('Page not specified', HttpStatusCode.BAD_REQUEST, true, '');
        // if(!lower) throw new APIError('Lower not specified', HttpStatusCode.BAD_REQUEST, true, '');
        // if(!upper) throw new APIError('Upper not specified', HttpStatusCode.BAD_REQUEST, true, '');
        const data = await getJobsService(
            +page,
            lower as string,
            upper as string,
            search as string,
            location as string,
            schedule as WorkingScheduleName[],
            empType as EmploymentTypeName[],
        )
        const response: ResponseData = {
            msg: 'Success',
            data: data,
            status: HttpStatusCode.OK,
        }
        res.status(HttpStatusCode.OK)
        res.json(response)
    } catch(err) {
        console.log(err)
        next(err);
    }
}

export const getTotalJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobCount = await getTotalJobsService()
        const response: ResponseData = {
            msg: 'Success',
            data: jobCount,
            status: HttpStatusCode.OK
        }
        res.status(HttpStatusCode.OK)
        res.json(response)
    } catch(err) {
        next(err)
    }
}