"use server";
import prisma from "@/lib/prisma";

export async function getTopBlogs() {
  try {
    const res = await prisma.blog.findMany({
      take: 3,
    });
    return res;
  } catch (error) {
    throw error;
  }
}
