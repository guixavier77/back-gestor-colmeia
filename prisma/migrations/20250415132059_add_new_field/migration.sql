/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Apicultores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Apicultores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Apicultores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apicultores" ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Logs" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "method" TEXT,
    "url" TEXT,
    "statusCode" INTEGER,
    "message" TEXT NOT NULL,
    "context" TEXT,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Apicultores_email_key" ON "Apicultores"("email");
