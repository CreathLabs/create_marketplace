"use server";
import prisma from "@/lib/prisma";
import { currentUser, getSession } from "./current";
import { NotAuthorizedError } from "@/lib/errors";
import { Prisma } from "@prisma/client";
import { Sort } from "@/lib/types";

export async function getTopNfts() {
  try {
    const res = await prisma.art.findMany({
      take: 9,
      where: {
        is_approved: true,
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return res.map((art) => ({
      ...art,
      likesCount: art._count.likes,
    }));
  } catch (error) {
    throw error;
  }
}

export async function getCategories() {
  try {
    const res = await prisma.category.findMany();
    return res;
  } catch (error) {
    throw error;
  }
}

export async function getNfts(
  page = 1,
  sortby: Sort = "popularity",
  filters: {
    category_id?: string;
    media?: string;
    min?: string;
    max?: string;
    name?: string;
  } = { category_id: "", media: "", min: "", max: "", name: "" },
  noPerPage = 9
) {
  const sortOptions: Record<Sort, any> = {
    popularity: {
      likes: {
        _count: "desc",
      },
    },
    recent: {
      created_at: "desc",
    },
    lowest: {
      floor_price: "asc",
    },
    highest: {
      floor_price: "desc",
    },
    sold: {},
  };

  const filterObject: Prisma.ArtWhereInput = {};

  Object.keys(filters).forEach((key) => {
    const value = filters[key as keyof typeof filters];

    if (!value) {
      return;
    }

    if (key === "name") {
      filterObject[key] = {
        search: value,
      };
    }

    if (key === "category_id") {
      filterObject[key] = value;
    }

    if (key === "min") {
      filterObject["floor_price"] = {
        gte: Number(value),
      };
    }

    if (key === "max") {
      filterObject["floor_price"] = {
        lte: Number(value),
      };
    }
  });

  try {
    const total = await prisma.art.count({
      where: {
        is_approved: true,
        AND: filterObject,
        ...(filters.media
          ? {
              OR: filters.media.split(",").map((type) => ({
                art_image: {
                  endsWith: `.${type}`,
                },
              })),
            }
          : {}),
      },
    });

    const data = await prisma.art.findMany({
      where: {
        is_approved: true,
        AND: filterObject,
        ...(filters.media
          ? {
              OR: filters.media.split(",").map((type) => ({
                art_image: {
                  endsWith: `.${type}`,
                },
              })),
            }
          : {}),
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: sortOptions[sortby],
      take: noPerPage,
      skip: (page - 1) * noPerPage,
    });
    return {
      total,
      data: data.map((art) => ({
        ...art,
        likesCount: art._count.likes,
      })),
      ipp: noPerPage,
    };
  } catch (error) {
    throw error;
  }
}

export async function getNft(id: string) {
  try {
    const data = await prisma.art.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export const likeNft = async (id: string) => {
  const token = await getSession("token");

  if (!token) {
    throw new NotAuthorizedError();
  }

  try {
    const res = await currentUser(token);
    if (!res.id) {
      throw new NotAuthorizedError();
    }

    const data = await prisma.likes.findUnique({
      where: {
        user_id_art_id: {
          art_id: id,
          user_id: res.id,
        },
      },
    });

    if (data) {
      await prisma.likes.delete({
        where: {
          user_id_art_id: {
            art_id: id,
            user_id: res.id,
          },
        },
      });
    } else {
      await prisma.likes.create({
        data: {
          art_id: id,
          user_id: res.id,
        },
      });
    }

    return;
  } catch (error) {
    throw error;
  }
};
