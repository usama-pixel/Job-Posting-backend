/*
  Warnings:

  - You are about to drop the column `tags` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_jobsTotags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_jobsTotags_AB_unique" ON "_jobsTotags"("A", "B");

-- CreateIndex
CREATE INDEX "_jobsTotags_B_index" ON "_jobsTotags"("B");

-- AddForeignKey
ALTER TABLE "_jobsTotags" ADD CONSTRAINT "_jobsTotags_A_fkey" FOREIGN KEY ("A") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_jobsTotags" ADD CONSTRAINT "_jobsTotags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
