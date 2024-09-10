"use server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { currentAdmin, getSession, isAdmin } from "../current";
import { NotAuthorizedError } from "@/lib/errors";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getAdminDashStats() {
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

    const collectorsCount = await prisma.user.count({
      where: {
        is_artist: false,
      },
    });

    const artistsCount = await prisma.user.count({
      where: {
        is_artist: true,
      },
    });

    const artworksCount = await prisma.art.count();

    return {
      collectorsCount,
      artistsCount,
      artworksCount,
    };
  } catch (error) {
    throw error;
  }
}
