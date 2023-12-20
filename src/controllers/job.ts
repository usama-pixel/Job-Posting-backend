import { NextFunction, Request, Response, response } from "express";
import { createJobService, getCountriesService, getEmpTypesService, getExpService, getJobsService, getScheduleService, getTagsService, getTotalJobsService  } from "../services/jobService.js";
import {ResponseData} from '../interface/responseData.js'
import { APIError } from "../utils/ApiError.js";
import HttpStatusCode from "../enums/HttpStatus.js";
import { EmploymentTypeName, WorkingScheduleName } from "@prisma/client";
import { AuthenticatedRequest } from "../interface/AuthenticatedRequest.js";

export const createJob = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const {position, companyName, tags, hourlyRate, address, empTypeId, scheduleId, countryId, expId} = req.body
        const fields = [position, companyName, hourlyRate, address, empTypeId, scheduleId, countryId, expId]
        // console.log(tags);
        
        const isEmpty = fields.some(field => !field || field.length === 0)

        if(isEmpty) throw new APIError('All fields must be filled', HttpStatusCode.BAD_REQUEST, true, '');

        const r = await createJobService({position, companyName, tags, hourlyRate, address, empTypeId, scheduleId, countryId, userId: req.user.id, expId})
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

export const getJobs = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { page } = req.query
        const { lower, upper, search, location, experience, schedule, empType } = req.body
        const token = req?.cookies?.token
        
        console.log({token});
        
        if(!page) throw new APIError('Page not specified', HttpStatusCode.BAD_REQUEST, true, '');
        const data = await getJobsService(
            +page,
            lower as string,
            upper as string,
            search as string,
            location as string,
            experience as string,
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

export const getTotalJobs = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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
        console.log(err);
        next(err)
    }
}

export const getCountries = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const countries = await getCountriesService()
        const response: ResponseData = {
            msg: 'Success',
            status: 200,
            data: countries
        }
        res.json(response)
    } catch(err) {
        console.log(err);
        next(err)
    }
}

export const getExp = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const exp = await getExpService()
        const response: ResponseData = {
            msg: 'Success',
            status: 200,
            data: exp
        }
        res.json(response)
    } catch(err) {
        console.log(err);
        next(err)
    }
}

export const getTags = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await getTagsService()
        const response: ResponseData = {
            msg: 'Success',
            status: 200,
            data: result
        }
        res.json(response)
    } catch(err) {
        console.log(err);
        next(err)
    }
}

export const getSchedule = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await getScheduleService()
        const response: ResponseData = {
            msg: 'Success',
            status: 200,
            data: result
        }
        res.json(response)
    } catch(err) {
        console.log(err);
        next(err)
    }
}

export const getEmpTypes = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await getEmpTypesService()
        const response: ResponseData = {
            msg: 'Success',
            status: 200,
            data: result
        }
        res.json(response)
    } catch(err) {
        console.log(err);
        next(err)
    }
}