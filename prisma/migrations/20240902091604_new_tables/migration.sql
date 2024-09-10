/*
  Warnings:

  - You are about to drop the `ArtAssets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAssets` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EXHIBITIONTYPE" AS ENUM ('HYBRID', 'PHYSICAL');

-- DropForeignKey
ALTER TABLE "ArtAssets" DROP CONSTRAINT "ArtAssets_art_id_fkey";

-- DropForeignKey
ALTER TABLE "ArtAssets" DROP CONSTRAINT "ArtAssets_asset_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAssets" DROP CONSTRAINT "UserAssets_asset_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAssets" DROP CONSTRAINT "UserAssets_user_id_fkey";

-- AlterTable
ALTER TABLE "Art" ADD COLUMN     "art_image" TEXT,
ADD COLUMN     "exhibition_id" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profile_image" TEXT;

-- DropTable
DROP TABLE "ArtAssets";

-- DropTable
DROP TABLE "Asset";

-- DropTable
DROP TABLE "UserAssets";

-- CreateTable
CREATE TABLE "Exhibition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "type" "EXHIBITIONTYPE" NOT NULL,
    "link" TEXT NOT NULL,
    "is_done" BOOLEAN NOT NULL DEFAULT false,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exhibition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Art" ADD CONSTRAINT "Art_exhibition_id_fkey" FOREIGN KEY ("exhibition_id") REFERENCES "Exhibition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
