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

export async function getExhibitions(page = 1, noPerPage = 6) {
  try {
    const total = await prisma.exhibition.count();
    const data = await prisma.exhibition.findMany({
      take: noPerPage,
      skip: (page - 1) * noPerPage,
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
