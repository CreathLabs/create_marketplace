-- CreateEnum
CREATE TYPE "NOTIFTYPE" AS ENUM ('BUYS', 'UPLOADS', 'FLAGS');

-- CreateEnum
CREATE TYPE "PROFILETYPE" AS ENUM ('GALLERY', 'ARTIST');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('SUPERADMIN', 'ADMIN');

-- CreateEnum
CREATE TYPE "EXHIBITIONTYPE" AS ENUM ('HYBRID', 'PHYSICAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "PROFILETYPE" NOT NULL DEFAULT 'ARTIST',
    "wallet_address" TEXT,
    "bio" VARCHAR(1000),
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
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "profile_image" TEXT,
    "cover_image" TEXT,
    "is_artist" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exhibition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "artist_name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "curator_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "images" TEXT[],
    "date" TIMESTAMP(3) NOT NULL,
    "nft_address" TEXT,
    "user_id" TEXT,

    CONSTRAINT "Exhibition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Art" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "floor_price" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR NOT NULL,
    "dimensions" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "location" TEXT,
    "contract" TEXT,
    "published_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "art_image" TEXT,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "nft_id" TEXT,
    "collected_by_id" TEXT,
    "exhibition_id" TEXT,

    CONSTRAINT "Art_pkey" PRIMARY KEY ("id")
);

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
    "collected_by_id" TEXT,

    CONSTRAINT "ExhibitionArt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collectibles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mint_price" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR NOT NULL,
    "total_minted" INTEGER NOT NULL DEFAULT 0,
    "total_unminted" INTEGER NOT NULL DEFAULT 0,
    "published_by" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "contract" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mint_per_wallet" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Collectibles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "user_id" TEXT NOT NULL,
    "art_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("user_id","art_id")
);

-- CreateTable
CREATE TABLE "Flags" (
    "user_id" TEXT NOT NULL,
    "art_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flags_pkey" PRIMARY KEY ("user_id","art_id")
);

-- CreateTable
CREATE TABLE "CollectibleLikes" (
    "user_id" TEXT NOT NULL,
    "collectible_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectibleLikes_pkey" PRIMARY KEY ("user_id","collectible_id")
);

-- CreateTable
CREATE TABLE "CollectibleFlags" (
    "user_id" TEXT NOT NULL,
    "collectible_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectibleFlags_pkey" PRIMARY KEY ("user_id","collectible_id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "art_id" TEXT,
    "type" "NOTIFTYPE" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_no" TEXT NOT NULL,
    "profile_image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_suspended" BOOLEAN NOT NULL DEFAULT false,
    "role" "ROLE" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_address_key" ON "User"("wallet_address");

-- CreateIndex
CREATE UNIQUE INDEX "User_reset_token_key" ON "User"("reset_token");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Exhibition" ADD CONSTRAINT "Exhibition_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Art" ADD CONSTRAINT "Art_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Art" ADD CONSTRAINT "Art_collected_by_id_fkey" FOREIGN KEY ("collected_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Art" ADD CONSTRAINT "Art_exhibition_id_fkey" FOREIGN KEY ("exhibition_id") REFERENCES "Exhibition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Art" ADD CONSTRAINT "Art_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitionArt" ADD CONSTRAINT "ExhibitionArt_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitionArt" ADD CONSTRAINT "ExhibitionArt_collected_by_id_fkey" FOREIGN KEY ("collected_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitionArt" ADD CONSTRAINT "ExhibitionArt_exhibition_id_fkey" FOREIGN KEY ("exhibition_id") REFERENCES "Exhibition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_art_id_fkey" FOREIGN KEY ("art_id") REFERENCES "Art"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flags" ADD CONSTRAINT "Flags_art_id_fkey" FOREIGN KEY ("art_id") REFERENCES "Art"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flags" ADD CONSTRAINT "Flags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectibleLikes" ADD CONSTRAINT "CollectibleLikes_collectible_id_fkey" FOREIGN KEY ("collectible_id") REFERENCES "Collectibles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectibleLikes" ADD CONSTRAINT "CollectibleLikes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectibleFlags" ADD CONSTRAINT "CollectibleFlags_collectible_id_fkey" FOREIGN KEY ("collectible_id") REFERENCES "Collectibles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectibleFlags" ADD CONSTRAINT "CollectibleFlags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_art_id_fkey" FOREIGN KEY ("art_id") REFERENCES "Art"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
