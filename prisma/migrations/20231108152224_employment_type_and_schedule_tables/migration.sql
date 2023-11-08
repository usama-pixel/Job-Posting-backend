-- CreateEnum
CREATE TYPE "WorkingScheduleName" AS ENUM ('FULLTIME', 'PARTTIME', 'INTERNSHIP', 'PROJECT_WORK');

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "employement_typeId" INTEGER,
ADD COLUMN     "working_scheduleId" INTEGER;

-- CreateTable
CREATE TABLE "working_schedule" (
    "id" SERIAL NOT NULL,
    "name" "WorkingScheduleName" NOT NULL DEFAULT 'FULLTIME',

    CONSTRAINT "working_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employement_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "employement_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_working_scheduleId_fkey" FOREIGN KEY ("working_scheduleId") REFERENCES "working_schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_employement_typeId_fkey" FOREIGN KEY ("employement_typeId") REFERENCES "employement_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
