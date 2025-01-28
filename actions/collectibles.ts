"use server";
import prisma from "@/lib/prisma";
import { currentUser, getSession } from "./current";
import { NotAuthorizedError } from "@/lib/errors";
import { Sort } from "@/lib/types";
import { Prisma } from "@prisma/client";

export async function getTopCollectibless() {
  try {
    const res = await prisma.collectibles.findMany({
      take: 3,
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

export async function getCollectibles(
  page = 1,
  sortby: Sort = "popularity",
  filters: {
    media?: string;
    min?: string;
    max?: string;
    name?: string;
  } = { media: "", min: "", max: "", name: "" },
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
      mint_price: "asc",
    },
    highest: {
      mint_price: "desc",
    },
    sold: {},
  };

  const filterObject: Prisma.CollectiblesWhereInput = {};

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

    if (key === "min") {
      filterObject["mint_price"] = {
        gte: Number(value),
      };
    }

    if (key === "max") {
      filterObject["mint_price"] = {
        lte: Number(value),
      };
    }
  });

  try {
    const total = await prisma.collectibles.count({
      where: {
        ...filterObject,
        ...(filters.media
          ? {
              OR: filters.media.split(",").map((type) => ({
                image: {
                  endsWith: `.${type}`,
                },
              })),
            }
          : {}),
      },
    });
    const data = await prisma.collectibles.findMany({
      where: {
        ...filterObject,
        ...(filters.media
          ? {
              OR: filters.media.split(",").map((type) => ({
                image: {
                  endsWith: `.${type}`,
                },
              })),
            }
          : {}),
      },
      orderBy: sortOptions[sortby],
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
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

export async function getCollectible(id: string) {
  try {
    const data = await prisma.collectibles.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    return {
      ...data,
      likesCount: data._count.likes,
    };
  } catch (error) {
    throw error;
  }
}

export const likeCollectible = async (id: string) => {
  const token = await getSession("token");

  if (!token) {
    throw new NotAuthorizedError();
  }

  try {
    const res = await currentUser(token);
    if (!res.id) {
      throw new NotAuthorizedError();
    }

    const data = await prisma.collectibleLikes.findUnique({
      where: {
        user_id_collectible_id: {
          collectible_id: id,
          user_id: res.id,
        },
      },
    });

    if (data) {
      await prisma.collectibleLikes.delete({
        where: {
          user_id_collectible_id: {
            collectible_id: id,
            user_id: res.id,
          },
        },
      });
    } else {
      await prisma.collectibleLikes.create({
        data: {
          collectible_id: id,
          user_id: res.id,
        },
      });
    }

    return;
  } catch (error) {
    throw error;
  }
};

export const flagCollectible = async (id: string) => {
  const token = await getSession("token");

  if (!token) {
    throw new NotAuthorizedError();
  }

  try {
    const res = await currentUser(token);
    if (!res.id) {
      throw new NotAuthorizedError();
    }

    const data = await prisma.collectibleFlags.findUnique({
      where: {
        user_id_collectible_id: {
          collectible_id: id,
          user_id: res.id,
        },
      },
    });

    if (data) {
      await prisma.collectibleFlags.delete({
        where: {
          user_id_collectible_id: {
            collectible_id: id,
            user_id: res.id,
          },
        },
      });
    } else {
      await prisma.collectibleFlags.create({
        data: {
          collectible_id: id,
          user_id: res.id,
        },
      });
    }

    return;
  } catch (error) {
    throw error;
  }
};
