/*
  Warnings:

  - You are about to drop the `job` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "job";

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "company_name" TEXT NOT NULL,
    "tags" TEXT[],
    "hourly_rate" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);
