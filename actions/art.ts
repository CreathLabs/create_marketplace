"use server";
import prisma from "@/lib/prisma";

export async function getTopNfts() {
  try {
    const res = await prisma.art.findMany({
      take: 9,
      where: {
        is_approved: true,
      },
    });
    return res;
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

export async function getNfts(page = 1, noPerPage = 9) {
  try {
    const total = await prisma.art.count({
      where: {
        is_approved: true,
      },
    });
    const data = await prisma.art.findMany({
      where: {
        is_approved: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: noPerPage,
      skip: (page - 1) * noPerPage,
    });
    return { total, data };
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
