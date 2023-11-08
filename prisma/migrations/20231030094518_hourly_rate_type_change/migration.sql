/*
  Warnings:

  - Changed the type of `hourly_rate` on the `jobs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "hourly_rate",
ADD COLUMN     "hourly_rate" INTEGER NOT NULL;
