"use server";
import prisma from "@/lib/prisma";
import { currentAdmin, getSession, isAdmin } from "../current";
import { NotAuthorizedError } from "@/lib/errors";

export async function getNotifications(
  type: "BUYS" | "UPLOADS" | "FLAGS" | "" = "",
  page = 1,
  ipp = 10
) {
  const token = await getSession("admin_token");
  if (!token) {
    return null;
  }
  try {
    const res = await currentAdmin(token);
    const isA = await isAdmin(res);

    if (!isA) {
      throw new NotAuthorizedError();
    }

    const total = await prisma.notification.count({});

    const data = await prisma.notification.findMany({
      ...(type
        ? {
            where: {
              type,
            },
          }
        : {}),
      include: { user: true },
      orderBy: {
        created_at: "desc",
      },
      skip: (page - 1) * ipp,
      take: ipp,
    });

    return { total, data, ipp };
  } catch (error) {
    throw error;
  }
}
