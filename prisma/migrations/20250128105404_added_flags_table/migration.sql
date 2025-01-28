-- CreateTable
CREATE TABLE "Flags" (
    "user_id" TEXT NOT NULL,
    "art_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flags_pkey" PRIMARY KEY ("user_id","art_id")
);

-- CreateTable
CREATE TABLE "CollectibleFlags" (
    "user_id" TEXT NOT NULL,
    "collectible_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectibleFlags_pkey" PRIMARY KEY ("user_id","collectible_id")
);

-- AddForeignKey
ALTER TABLE "Flags" ADD CONSTRAINT "Flags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flags" ADD CONSTRAINT "Flags_art_id_fkey" FOREIGN KEY ("art_id") REFERENCES "Art"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectibleFlags" ADD CONSTRAINT "CollectibleFlags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectibleFlags" ADD CONSTRAINT "CollectibleFlags_collectible_id_fkey" FOREIGN KEY ("collectible_id") REFERENCES "Collectibles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
