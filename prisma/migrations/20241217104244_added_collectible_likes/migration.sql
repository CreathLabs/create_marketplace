-- CreateTable
CREATE TABLE "CollectibleLikes" (
    "user_id" TEXT NOT NULL,
    "collectible_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectibleLikes_pkey" PRIMARY KEY ("user_id","collectible_id")
);

-- AddForeignKey
ALTER TABLE "CollectibleLikes" ADD CONSTRAINT "CollectibleLikes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectibleLikes" ADD CONSTRAINT "CollectibleLikes_collectible_id_fkey" FOREIGN KEY ("collectible_id") REFERENCES "Collectibles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
