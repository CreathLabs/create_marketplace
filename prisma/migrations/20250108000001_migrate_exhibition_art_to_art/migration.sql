-- AlterTable Art: Add exhibition_id column and make user_id nullable
ALTER TABLE "Art" ADD COLUMN "exhibition_id" TEXT;
ALTER TABLE "Art" ALTER COLUMN "user_id" DROP NOT NULL;

-- Add foreign key constraint for exhibition_id
ALTER TABLE "Art" ADD CONSTRAINT "Art_exhibition_id_fkey" FOREIGN KEY ("exhibition_id") REFERENCES "Exhibition"("id") ON DELETE SET NULL ON UPDATE CASCADE;/

-- Change user_id foreign key to SET NULL on delete instead of CASCADE
ALTER TABLE "Art" DROP CONSTRAINT "Art_user_id_fkey";
ALTER TABLE "Art" ADD CONSTRAINT "Art_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Migrate data from ExhibitionArt to Art table
INSERT INTO "Art" (
    id,
    name,
    floor_price,
    description,
    dimensions,
    user_id,
    category_id,
    exhibition_id,
    location,
    contract,
    published_by,
    art_image,
    nft_id,
    is_approved,
    created_at,
    updated_at,
    collected_by_id
)
SELECT 
    ea.id,
    ea.name,
    ea.floor_price,
    ea.description,
    ea.dimensions,
    e.user_id,  -- Use exhibition creator as the user_id
    ea.category_id,
    ea.exhibition_id,
    NULL as location,  -- ExhibitionArt doesn't have location
    NULL as contract,  -- ExhibitionArt doesn't have contract
    e.artist_name as published_by,  -- Use exhibition artist_name
    ea.art_image,
    ea.nft_id,
    true as is_approved,  -- Assume exhibition artworks are approved
    ea.created_at,
    ea.updated_at,
    ea.collected_by_id
FROM "ExhibitionArt" ea
JOIN "Exhibition" e ON ea.exhibition_id = e.id
WHERE ea.id NOT IN (SELECT id FROM "Art");  -- Avoid duplicates if migration is run multiple times