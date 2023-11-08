import { Router } from "express";
import {createJob, getJobs, getTotalJobs} from "../controllers/job.js";

export const jobRoutes = Router()

jobRoutes.post('/job/create', createJob)
jobRoutes.post('/jobs', getJobs)
jobRoutes.get('/job-count', getTotalJobs)