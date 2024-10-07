"use server";
import prisma from "@/lib/prisma";

export async function getTopArtists() {
  try {
    const res = await prisma.user.findMany({
      where: {
        is_approved: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: 8,
    });

    return res;
  } catch (error) {
    throw error;
  }
}

export async function getArtists(page = 1, noPerPage = 16) {
  try {
    const total = await prisma.user.count({
      where: {
        is_approved: true,
      },
    });
    const data = await prisma.user.findMany({
      where: {
        is_approved: true,
      },
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

export async function getArtist(id: string) {
  try {
    const data = await prisma.user.findUniqueOrThrow({
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
