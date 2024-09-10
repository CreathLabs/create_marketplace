-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('SUPERADMIN', 'ADMIN');

-- CreateTable
CREATE TABLE "Likes" (
    "user_id" TEXT NOT NULL,
    "art_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("user_id","art_id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_no" TEXT NOT NULL,
    "type" "ROLE" NOT NULL DEFAULT 'ADMIN',
    "profile_image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_suspended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_art_id_fkey" FOREIGN KEY ("art_id") REFERENCES "Art"("id") ON DELETE CASCADE ON UPDATE CASCADE;
