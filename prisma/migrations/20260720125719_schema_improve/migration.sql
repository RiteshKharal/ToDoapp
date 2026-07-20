/*
  Warnings:

  - You are about to drop the `Settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_userId_fkey";

-- DropTable
DROP TABLE "Settings";

-- CreateTable
CREATE TABLE "settings" (
    "userId" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "settings_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
