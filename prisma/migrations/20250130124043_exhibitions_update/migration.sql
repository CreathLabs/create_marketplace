/*
  Warnings:

  - You are about to drop the column `exhibition_id` on the `Art` table. All the data in the column will be lost.
  - You are about to drop the column `is_done` on the `Exhibition` table. All the data in the column will be lost.
  - You are about to drop the column `is_featured` on the `Exhibition` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Exhibition` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Exhibition` table. All the data in the column will be lost.
  - The `images` column on the `Exhibition` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `address` to the `Exhibition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artist_name` to the `Exhibition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Exhibition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curator_name` to the `Exhibition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Exhibition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Exhibition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Exhibition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Art" DROP CONSTRAINT "Art_exhibition_id_fkey";

-- AlterTable
ALTER TABLE "Art" DROP COLUMN "exhibition_id";

-- AlterTable
ALTER TABLE "Exhibition" DROP COLUMN "is_done",
DROP COLUMN "is_featured",
DROP COLUMN "link",
DROP COLUMN "type",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "artist_name" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "curator_name" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL,
DROP COLUMN "images",
ADD COLUMN     "images" TEXT[],
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ExhibitionArt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "floor_price" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR NOT NULL,
    "dimensions" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "exhibition_id" TEXT NOT NULL,
    "art_image" TEXT NOT NULL,
    "nft_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExhibitionArt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExhibitionArt" ADD CONSTRAINT "ExhibitionArt_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitionArt" ADD CONSTRAINT "ExhibitionArt_exhibition_id_fkey" FOREIGN KEY ("exhibition_id") REFERENCES "Exhibition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
