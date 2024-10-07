"use server";
import prisma from "@/lib/prisma";

export async function getTopCollectibless() {
  try {
    const res = await prisma.collectibles.findMany({
      take: 3,
    });
    return res;
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
      take: noPerPage,
      skip: (page - 1) * noPerPage,
    });
    return { total, data, ipp: noPerPage };
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
