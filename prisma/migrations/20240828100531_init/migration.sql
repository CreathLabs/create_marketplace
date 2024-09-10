-- CreateEnum
CREATE TYPE "PROFILETYPE" AS ENUM ('GALLERY', 'ARTIST');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "PROFILETYPE" NOT NULL DEFAULT 'ARTIST',
    "wallet_address" TEXT,
    "bio" VARCHAR(300),
    "instagram" TEXT,
    "twitter" TEXT,
    "country" TEXT,
    "state" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_email_verified" BOOLEAN DEFAULT false,
    "otp" TEXT,
    "otp_expires_in" TIMESTAMP(3),
    "reset_token" TEXT,
    "token_expies_in" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Art" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "floor_price" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "medium" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "location" TEXT,
    "contract" TEXT,
    "published_by" TEXT,

    CONSTRAINT "Art_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "public_id" TEXT,
    "blur_hash" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAssets" (
    "user_id" TEXT NOT NULL,
    "asset_id" TEXT NOT NULL,

    CONSTRAINT "UserAssets_pkey" PRIMARY KEY ("user_id","asset_id")
);

-- CreateTable
CREATE TABLE "ArtAssets" (
    "art_id" TEXT NOT NULL,
    "asset_id" TEXT NOT NULL,

    CONSTRAINT "ArtAssets_pkey" PRIMARY KEY ("art_id","asset_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_address_key" ON "User"("wallet_address");

-- CreateIndex
CREATE UNIQUE INDEX "User_reset_token_key" ON "User"("reset_token");

-- AddForeignKey
ALTER TABLE "Art" ADD CONSTRAINT "Art_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Art" ADD CONSTRAINT "Art_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAssets" ADD CONSTRAINT "UserAssets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAssets" ADD CONSTRAINT "UserAssets_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtAssets" ADD CONSTRAINT "ArtAssets_art_id_fkey" FOREIGN KEY ("art_id") REFERENCES "Art"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtAssets" ADD CONSTRAINT "ArtAssets_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
