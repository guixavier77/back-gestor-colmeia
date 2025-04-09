/*
  Warnings:

  - Added the required column `latitude` to the `Apicultores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Apicultores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apicultores" ADD COLUMN     "latitude" VARCHAR(255) NOT NULL,
ADD COLUMN     "longitude" VARCHAR(255) NOT NULL;
