"use server";
import prisma from "@/lib/prisma";
import { currentAdmin, getSession, isAdmin } from "../current";
import { NotAuthorizedError } from "@/lib/errors";
import { PROFILETYPE } from "@prisma/client";

export async function getUsersStats() {
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
        type: "ARTIST",
      },
    });

    const galleriesCount = await prisma.user.count({
      where: {
        type: "GALLERY",
      },
    });

    return {
      collectorsCount,
      artistsCount,
      galleriesCount,
    };
  } catch (error) {
    throw error;
  }
}

export async function getAdminUsers(type: PROFILETYPE, page = 1, ipp = 100) {
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

    const total = await prisma.user.count({
      where: {
        type,
      },
    });

    const data = await prisma.user.findMany({
      where: {
        type,
      },
      include: {
        artworks: true,
      },
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

export async function getAdminUser(id: string) {
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

    const data = await prisma.user.findUnique({
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
