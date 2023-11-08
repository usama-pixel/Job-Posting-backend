import { EmploymentTypeName, WorkingScheduleName } from "@prisma/client";
import { prisma } from "../db/db.js"
import { itemsPerPage } from "../utils/constants.js";

export const createJobService = async ({position, companyName, tags, hourlyRate, address}: {position: string, companyName: string, tags: string[], hourlyRate: number, address: string}) => {
    const result = await prisma.jobs.create(
        {
            data: {
                position,
                date: new Date(),
                company_name: companyName,
                tags: ['a', 'b'],
                hourly_rate: +hourlyRate,
                address
            }
        }
    )
    return result;
}


export const getJobsService = async (
    page: number,
    lower: string = '0',
    upper: string = '100',
    search: string,
    location: string,
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
        where.address = {
            contains: location,
            mode: 'insensitive'
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