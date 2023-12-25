-- CreateTable
CREATE TABLE "user_jobs" (
    "userId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,

    CONSTRAINT "user_jobs_pkey" PRIMARY KEY ("userId","jobId")
);

-- AddForeignKey
ALTER TABLE "user_jobs" ADD CONSTRAINT "user_jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_jobs" ADD CONSTRAINT "user_jobs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
