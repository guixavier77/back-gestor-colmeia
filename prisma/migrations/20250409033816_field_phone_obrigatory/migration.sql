/*
  Warnings:

  - Made the column `phone` on table `Apicultores` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Apicultores" ALTER COLUMN "phone" SET NOT NULL;
