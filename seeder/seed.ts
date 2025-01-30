import { PrismaClient } from "@prisma/client";
import {
  seedArt,
  seedArtits,
  seedBlogs,
  seedCategories,
  // seedExhibitions,
  seedNotifications,
  seedSuperAdmin,
  seedUsers,
} from "./seeds";

const prisma = new PrismaClient();

async function main() {
  await seedCategories();
  await seedBlogs();
  // await seedExhibitions();
  await seedUsers();
  await seedArt();
  await seedSuperAdmin();
  await seedArtits();
  await seedNotifications();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
