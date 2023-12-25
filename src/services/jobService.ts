import { EmploymentTypeName, WorkingScheduleName, user } from "@prisma/client";
import { prisma } from "../db/db.js"
import { itemsPerPage } from "../utils/constants.js";

type CreateJob = {
    position: string,
    companyName: string,
    tags: string[],
    hourlyRate: number,
    address: string,
    empTypeId: number,
    scheduleId: number,
    countryId: number,
    userId: number,
    expId: number
}

export const createJobService = async ({position, companyName, tags, hourlyRate, address, empTypeId, scheduleId, countryId, userId, expId}:CreateJob) => {
    const result = await prisma.jobs.create(
        {
            data: {
                position,
                date: new Date(),
                company_name: companyName,
                hourly_rate: +hourlyRate,
                experience_levelId: expId,
                employment_typeId: empTypeId,
                working_scheduleId: scheduleId,
                countriesId: countryId,
                userId: userId
            }
        }
    )
    console.log({result})
    return result;
}


export const getJobsService = async (
    page: number,
    lower: string = '0',
    upper: string = '100',
    search: string,
    location: string,
    experience: string,
    schedule: WorkingScheduleName[],
    empType: EmploymentTypeName[]

) => {
    // console.log({page, itemsPerPage, lower, upper});
    const where: any = {}
    if(+lower !== 0 || +upper !== 0) {
        where.hourly_rate = {
            gte: +lower,
            lte: +upper
        }
    }
    if(search) {
        where.position = {
            contains: search,
            mode: 'insensitive'
        }
    }
    if(location) {
        where.countries = {
            name: {
                contains: location,
                mode: 'insensitive'
            }
        }
    }
    if(experience && experience.toLowerCase() !== 'entry level') {
        where.experience_level = {
            name: {
                contains: experience,
                mode: 'insensitive'
            }
        }
    }
    if(schedule && schedule.length > 0) {
        where.working_schedule = {
            name: {
                in: schedule
            }
        }
    }
    if(empType && empType.length > 0) {
        where.employment_type = {
            name: {
                in: empType
            }
        }
    }
    const skip = (page -1) * itemsPerPage;
    const result = await prisma.jobs.findMany({
        orderBy: {
            date: 'desc'
        },
        where: where,
        skip,
        take: itemsPerPage,
    });
    return result;
}

export const getTotalJobsService = async () => {
    const result = await prisma.jobs.count()
    return result
}

export const getCountriesService = async () => {
    const result = await prisma.countries.findMany()
    return result
}

export const getExpService = async () => {
    const result = await prisma.experience_level.findMany()
    return result
}

export const getTagsService = async () => {
    const result = await prisma.tags.findMany()
    return result
}

export const getScheduleService = async () => {
    const result = await prisma.working_schedule.findMany();
    return result;
}

export const getEmpTypesService = async () => {
    const result = await prisma.employment_type.findMany();
    return result;
}

export const applyJobService = async (myId: number, jobId: number) => {
    const result = await prisma.user_jobs.create({
        data: {
            jobId,
            userId: myId
        }
    })
    return result;
}

export const getAppliedJobsService = async (myId: number) => {
    const result = await prisma.user_jobs.findMany({
        where: {
            userId: myId
        },
        include: {
            job: {
                select: {
                    company_name: true,
                    position: true
                }
            }
        }
    })
    return result
}