-- CreateTable
CREATE TABLE "Collectibles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mint_price" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR NOT NULL,
    "min_per_wallet" INTEGER NOT NULL DEFAULT 0,
    "total_minted" INTEGER NOT NULL DEFAULT 0,
    "total_unminted" INTEGER NOT NULL DEFAULT 0,
    "published_by" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "contract" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collectibles_pkey" PRIMARY KEY ("id")
);
