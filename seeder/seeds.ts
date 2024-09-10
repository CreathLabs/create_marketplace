import { Category, PrismaClient } from "@prisma/client";
import fs from "fs";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface BlogType {
  id: string;
  title: string;
  description: string;
  content: string;
  cover_image: string;
  created_at: string;
  updated_at: string;
}

interface UserType {
  id: string;
  full_name: string;
  email: string;
  username: string;
  phone: null;
  role: string;
  bio: string;
  country: string;
  state: string;
  address: string;
  wallet: string;
  profile_image: string;
  twitter: string;
  instagram: string;
  portfolio: null;
  password: string;
  remember_token: null;
  created_at: string;
  updated_at: string;
}

interface ArtType {
  id: string;
  name: string;
  artist_name: string;
  nft_id: string;
  price: string;
  art_image: string;
  description: string;
  dimension: string;
  weight: string;
  artist_location: string;
  is_freezed: string;
  has_physical_copy: string;
  category_id: string;
  artist_id: string;
  user_id: string;
  collection_id: string;
  created_at: string;
  updated_at: string;
  is_sold: string;
}

interface ExhibitionType {
  id: string;
  name: string;
  description: string;
  cover_image: string;
  images: string;
  type: string;
  link: string;
  is_featured: string;
  is_done: string;
  created_at: string;
  updated_at: string;
  thumbnails: string;
  date: string;
}

const categoryIds: Record<string, string> = {
  "1": "f6b9da8f-e317-4d53-a229-ce5fd9433858",
  "2": "59701cf2-516d-401a-ac0c-f1d22c3582b8",
  "3": "6c12ccee-89cc-45a4-a4d2-ca24fd9ef65a",
  "4": "6db703d1-b631-4e43-b11f-b08e706619c4",
  "6": "8960f1a4-6a0c-47d2-b776-323c1186890c",
};

export const seedCategories = async () => {
  const categoriesCount = await prisma.category.count();

  if (categoriesCount > 0) {
    return;
  }

  const data = fs.readFileSync("seeder/data/categories.json", {
    encoding: "utf8",
  });

  const categories: Category[] = JSON.parse(data);

  try {
    await prisma.category.createMany({
      data: categories,
    });
    console.log("Categories seeded");
  } catch (error) {
    console.log(error);
  }
};

export const seedBlogs = async () => {
  const blogsCount = await prisma.blog.count();

  if (blogsCount > 0) {
    return;
  }

  const data = fs.readFileSync("seeder/data/blogs.json", {
    encoding: "utf8",
  });

  const blogs: BlogType[] = JSON.parse(data);

  try {
    await prisma.blog.createMany({
      data: blogs.map(({ content, cover_image, title, description }) => ({
        content,
        cover_image,
        title,
        description,
      })),
    });
    console.log("Blogs seeded");
  } catch (error) {
    console.log(error);
  }
};

export const seedExhibitions = async () => {
  const exhibitionsCount = await prisma.exhibition.count();

  if (exhibitionsCount > 0) {
    return;
  }

  const data = fs.readFileSync("seeder/data/exhibitions.json", {
    encoding: "utf8",
  });

  const exhibitions: ExhibitionType[] = JSON.parse(data);

  try {
    await prisma.exhibition.createMany({
      data: exhibitions.map(
        ({
          cover_image,
          description,
          date,
          is_done,
          is_featured,
          images,
          name,
          link,
        }) => ({
          cover_image,
          date,
          description,
          images,
          link,
          name,
          type: "PHYSICAL",
          is_done: Boolean(is_done),
          is_featured: Boolean(is_featured),
        })
      ),
    });
    console.log("Exhibitions seeded");
  } catch (error) {
    console.log(error);
  }
};

export const seedUsers = async () => {
  const usersCount = await prisma.user.count();

  if (usersCount > 1) {
    return;
  }

  const data = fs.readFileSync("seeder/data/users.json", {
    encoding: "utf8",
  });

  const users: UserType[] = JSON.parse(data);

  try {
    await prisma.user.createMany({
      data: users.map(
        ({
          email,
          username,
          wallet,
          country,
          state,
          address,
          bio,
          instagram,
          twitter,
          profile_image,
        }) => {
          const hashedPassword = bcrypt.hashSync(username, 10);
          return {
            email,
            password: hashedPassword,
            username,
            wallet_address: wallet,
            bio: bio?.substring(0, 1000) || null,
            instagram,
            twitter,
            country,
            state,
            address,
            profile_image,
            is_approved: profile_image ? true : false,
          };
        }
      ),
      skipDuplicates: true,
    });
    console.log("Users seeded");
  } catch (error) {
    console.log(error);
  }
};

export const seedArt = async () => {
  const artCount = await prisma.art.count();

  if (artCount > 0) {
    return;
  }

  const users = await prisma.user.findMany();

  const data = fs.readFileSync("seeder/data/art.json", {
    encoding: "utf8",
  });

  const art: ArtType[] = JSON.parse(data);

  const superID = "f19da785-9ba9-46bb-ac31-38a98f340048";

  try {
    await prisma.art.createMany({
      data: art.map(
        ({
          name,
          price,
          description,
          dimension,
          category_id,
          artist_location,
          art_image,
          artist_name,
        }) => {
          return {
            name,
            floor_price: parseFloat(price || "0.00"),
            category_id: categoryIds[category_id],
            description,
            dimensions: dimension || "",
            art_image,
            location: artist_location,
            published_by: artist_name,
            user_id:
              users.find(
                (u) =>
                  u.username
                    ?.toLowerCase()
                    ?.includes(artist_name?.toLowerCase()) ||
                  u.email?.includes(artist_name?.toLowerCase())
              )?.id || superID,
            medium: "Digital AI",
            is_approved: true,
          };
        }
      ),
      skipDuplicates: true,
    });
    console.log("Art seeded");
  } catch (error) {
    console.log(error);
  }
};

export const seedSuperAdmin = async () => {
  const superAdmin = await prisma.admin.findUnique({
    where: { email: "superadmin@creath.io" },
  });

  if (superAdmin) {
    return;
  }

  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.log("Please provide a password in your environment");
    return;
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    await prisma.admin.create({
      data: {
        email: "superadmin@creath.io",
        full_name: "Super Admin",
        password: hashedPassword,
        phone_no: "081...",
        profile_image: `https://api.dicebear.com/9.x/initials/png?seed="Super Admin"`,
        role: "SUPERADMIN",
      },
    });
    console.log("Super Admin seeded");
  } catch (error) {
    console.log(error);
  }
};

export const seedArtits = async () => {
  try {
    await prisma.user.updateMany({
      where: { artworks: { some: { category_id: undefined } } },
      data: {
        is_artist: true,
      },
    });
    console.log("Artists approved successfully");
  } catch (error) {
    console.log(error);
  }
};
