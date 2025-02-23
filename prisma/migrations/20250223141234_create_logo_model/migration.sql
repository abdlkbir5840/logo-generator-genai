-- CreateTable
CREATE TABLE "Logo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Logo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logo" ADD CONSTRAINT "Logo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
