import { Router } from "express";
import { createJob, getCountries, getEmpTypes, getExp, getJobs, getSchedule, getTags, getTotalJobs, applyJob, getAppliedJobs } from "../controllers/job.js";

export const jobRoutes = Router()

jobRoutes.post('/job/create', createJob)
jobRoutes.post('/jobs', getJobs)
jobRoutes.get('/job-count', getTotalJobs)
jobRoutes.get('/countries', getCountries)
jobRoutes.get('/exp', getExp)
jobRoutes.get('/tags', getTags)
jobRoutes.get('/schedule', getSchedule)
jobRoutes.get('/employment-types', getEmpTypes)
jobRoutes.post('/job/apply', applyJob)
jobRoutes.get('/applied-job', getAppliedJobs)