import { Router } from "express";
import { createJob, getTotalJobs } from "../controllers/job.js";
export const jobRoutes = Router();
jobRoutes.post('/job/create', createJob);
// jobRoutes.post('/jobs', getJobs)
jobRoutes.get('/joba', getTotalJobs);
// jobRoutes.post('/jobs', (req: Request, res: Response) => {
//     console.log("yesa");
//     res.json({abc: 'yes'})
// })
//# sourceMappingURL=job.js.map