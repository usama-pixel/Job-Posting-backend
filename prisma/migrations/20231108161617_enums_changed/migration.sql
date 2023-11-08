/*
  Warnings:

  - The values [FULLTIME,PARTTIME] on the enum `WorkingScheduleName` will be removed. If these variants are still used in the database, this will fail.
  - The `name` column on the `employment_type` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EmploymentTypeName" AS ENUM ('FULL_DAY', 'FLEXIBLE', 'SHIFT_WORK', 'REMOTE');

-- AlterEnum
BEGIN;
CREATE TYPE "WorkingScheduleName_new" AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'PROJECT_WORK');
ALTER TABLE "working_schedule" ALTER COLUMN "name" DROP DEFAULT;
ALTER TABLE "working_schedule" ALTER COLUMN "name" TYPE "WorkingScheduleName_new" USING ("name"::text::"WorkingScheduleName_new");
ALTER TYPE "WorkingScheduleName" RENAME TO "WorkingScheduleName_old";
ALTER TYPE "WorkingScheduleName_new" RENAME TO "WorkingScheduleName";
DROP TYPE "WorkingScheduleName_old";
ALTER TABLE "working_schedule" ALTER COLUMN "name" SET DEFAULT 'FULL_TIME';
COMMIT;

-- AlterTable
ALTER TABLE "employment_type" DROP COLUMN "name",
ADD COLUMN     "name" "EmploymentTypeName" NOT NULL DEFAULT 'FULL_DAY';

-- AlterTable
ALTER TABLE "working_schedule" ALTER COLUMN "name" SET DEFAULT 'FULL_TIME';
