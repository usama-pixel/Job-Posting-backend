-- CreateTable
CREATE TABLE "msgs" (
    "id" SERIAL NOT NULL,
    "msg" TEXT NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,

    CONSTRAINT "msgs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "msgs" ADD CONSTRAINT "msgs_from_fkey" FOREIGN KEY ("from") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "msgs" ADD CONSTRAINT "msgs_to_fkey" FOREIGN KEY ("to") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
