/*
  Warnings:

  - You are about to drop the column `type` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "type",
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'ADMIN';
