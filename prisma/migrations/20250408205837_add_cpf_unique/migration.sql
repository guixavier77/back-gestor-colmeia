/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Apicultores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Apicultores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apicultores" ADD COLUMN     "cpf" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Apicultores_cpf_key" ON "Apicultores"("cpf");
