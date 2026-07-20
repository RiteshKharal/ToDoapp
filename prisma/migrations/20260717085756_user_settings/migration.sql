-- CreateTable
CREATE TABLE "Settings" (
    "userId" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
