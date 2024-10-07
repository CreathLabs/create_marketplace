"use server";
import prisma from "@/lib/prisma";
import { currentAdmin, getSession, isAdmin } from "../current";
import { NotAuthorizedError } from "@/lib/errors";
import { InferType } from "yup";
import {
  UploadCollectibleSchema,
  validateUploadCollectibleSchema,
} from "@/lib/schemas";

export async function addCollectible(
  values: InferType<typeof UploadCollectibleSchema>
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

    const data = await validateUploadCollectibleSchema(values);

    const collectible = await prisma.collectibles.create({
      data,
    });

    return collectible;
  } catch (error) {
    throw error;
  }
}

export async function getAdminCollectibles(page = 1, ipp = 10) {
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

    const total = await prisma.collectibles.count({});

    const data = await prisma.collectibles.findMany({
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
