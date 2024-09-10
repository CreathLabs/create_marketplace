"use server";
import prisma from "@/lib/prisma";
import { currentUser, getSession } from "../current";

export async function getAdminProfile() {
  const token = await getSession("admin_token");
  if (!token) {
    return null;
  }
  try {
    const res = await currentUser(token);
    if (!res.id) {
      return null;
    }

    const user = await prisma.admin.findUniqueOrThrow({
      where: {
        id: res.id,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}
