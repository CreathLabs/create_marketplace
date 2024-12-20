"use server";
import prisma from "@/lib/prisma";
import { currentUser, getSession } from "./current";
import { NotAuthorizedError } from "@/lib/errors";

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

export async function getCollectibles(page = 1, noPerPage = 9) {
  try {
    const total = await prisma.collectibles.count({});
    const data = await prisma.collectibles.findMany({
      orderBy: {
        created_at: "desc",
      },
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
    });
    return data;
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
