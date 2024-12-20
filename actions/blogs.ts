"use server";
import prisma from "@/lib/prisma";

export async function getTopBlogs() {
  try {
    const res = await prisma.blog.findMany({
      take: 3,
      orderBy: {
        created_at: "desc",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function getBlog(id: string) {
  try {
    const data = await prisma.blog.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBlogs() {
  try {
    const data = await prisma.blog.findMany();
    return data;
  } catch (error) {
    throw error;
  }
}
