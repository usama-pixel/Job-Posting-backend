-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "countriesId" INTEGER,
ADD COLUMN     "experience_levelId" INTEGER;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_experience_levelId_fkey" FOREIGN KEY ("experience_levelId") REFERENCES "experience_level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_countriesId_fkey" FOREIGN KEY ("countriesId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
