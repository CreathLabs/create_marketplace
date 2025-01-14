"use server";
import prisma from "@/lib/prisma";

export async function getTopExhibitions() {
  try {
    const res = await prisma.exhibition.findMany({
      take: 4,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function getExhibitions(page = 1, query = "", noPerPage = 6) {
  try {
    const total = await prisma.exhibition.count({
      where: {
        ...(query
          ? {
              AND: {
                name: {
                  search: query,
                },
              },
            }
          : {}),
      },
    });
    const data = await prisma.exhibition.findMany({
      where: {
        ...(query
          ? {
              AND: {
                name: {
                  search: query,
                },
              },
            }
          : {}),
      },
      take: noPerPage,
      skip: (page - 1) * noPerPage,
      orderBy: {
        created_at: "desc",
      },
    });
    return { total, data, ipp: noPerPage };
  } catch (error) {
    throw error;
  }
}

export async function getExhibition(id: string) {
  try {
    const data = await prisma.exhibition.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        artworks: true,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
