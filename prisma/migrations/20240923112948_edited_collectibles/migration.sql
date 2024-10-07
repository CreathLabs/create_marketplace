/*
  Warnings:

  - You are about to drop the column `min_per_wallet` on the `Collectibles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collectibles" DROP COLUMN "min_per_wallet",
ADD COLUMN     "mint_per_wallet" INTEGER NOT NULL DEFAULT 0;
