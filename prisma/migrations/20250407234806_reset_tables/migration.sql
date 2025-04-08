/*
  Warnings:

  - You are about to drop the column `birthDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `awards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `promotion_winners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `promotions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `promotions_users_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `promotions_users_point` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `qr_code` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `request_award` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reset_password_token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rewards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "awards" DROP CONSTRAINT "awards_storeId_fkey";

-- DropForeignKey
ALTER TABLE "promotion_winners" DROP CONSTRAINT "promotion_winners_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "promotion_winners" DROP CONSTRAINT "promotion_winners_userId_fkey";

-- DropForeignKey
ALTER TABLE "promotions" DROP CONSTRAINT "promotions_awardId_fkey";

-- DropForeignKey
ALTER TABLE "promotions" DROP CONSTRAINT "promotions_storeId_fkey";

-- DropForeignKey
ALTER TABLE "promotions_users_history" DROP CONSTRAINT "promotions_users_history_operatorId_fkey";

-- DropForeignKey
ALTER TABLE "promotions_users_history" DROP CONSTRAINT "promotions_users_history_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "promotions_users_history" DROP CONSTRAINT "promotions_users_history_userId_fkey";

-- DropForeignKey
ALTER TABLE "promotions_users_point" DROP CONSTRAINT "promotions_users_point_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "promotions_users_point" DROP CONSTRAINT "promotions_users_point_userId_fkey";

-- DropForeignKey
ALTER TABLE "request_award" DROP CONSTRAINT "request_award_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "request_award" DROP CONSTRAINT "request_award_userId_fkey";

-- DropForeignKey
ALTER TABLE "rewards" DROP CONSTRAINT "rewards_operatorId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_storeId_fkey";

-- DropForeignKey
ALTER TABLE "users_history" DROP CONSTRAINT "users_history_storeId_fkey";

-- DropForeignKey
ALTER TABLE "users_history" DROP CONSTRAINT "users_history_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "birthDate",
DROP COLUMN "storeId";

-- DropTable
DROP TABLE "awards";

-- DropTable
DROP TABLE "promotion_winners";

-- DropTable
DROP TABLE "promotions";

-- DropTable
DROP TABLE "promotions_users_history";

-- DropTable
DROP TABLE "promotions_users_point";

-- DropTable
DROP TABLE "qr_code";

-- DropTable
DROP TABLE "request_award";

-- DropTable
DROP TABLE "reset_password_token";

-- DropTable
DROP TABLE "rewards";

-- DropTable
DROP TABLE "stores";

-- DropTable
DROP TABLE "users_history";
