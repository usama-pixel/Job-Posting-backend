/*
  Warnings:

  - You are about to drop the column `employement_typeId` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the `employement_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_employement_typeId_fkey";

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "employement_typeId",
ADD COLUMN     "employment_typeId" INTEGER;

-- DropTable
DROP TABLE "employement_type";

-- CreateTable
CREATE TABLE "employment_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "employment_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_employment_typeId_fkey" FOREIGN KEY ("employment_typeId") REFERENCES "employment_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
