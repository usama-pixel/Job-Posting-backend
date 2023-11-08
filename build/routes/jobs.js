import { Router } from "express";
import { createJob } from "../controllers/jobs.js";
export const jobRouter = Router();
router.post('/job/create', createJob);
//# sourceMappingURL=jobs.js.map