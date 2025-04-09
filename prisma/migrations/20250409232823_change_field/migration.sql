/*
  Warnings:

  - You are about to drop the column `status` on the `Apicultores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Apicultores" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN DEFAULT true;
