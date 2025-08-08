-- AlterTable
ALTER TABLE "ExhibitionArt" ADD COLUMN     "collected_by_id" TEXT;

-- AddForeignKey
ALTER TABLE "ExhibitionArt" ADD CONSTRAINT "ExhibitionArt_collected_by_id_fkey" FOREIGN KEY ("collected_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
