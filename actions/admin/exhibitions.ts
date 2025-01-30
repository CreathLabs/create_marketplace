"use server";
import prisma from "@/lib/prisma";
import { currentAdmin, getSession, isAdmin } from "../current";
import { NotAuthorizedError } from "@/lib/errors";
import { InferType } from "yup";
import {
  UploadExhibitionSchema,
  validateUploadExhibitionSchema,
} from "@/lib/schemas/exhibition";

export async function getAdminExhibitions(page = 1, ipp = 10) {
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

    const total = await prisma.exhibition.count({});

    const data = await prisma.exhibition.findMany({
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

export async function addExhibition(
  values: InferType<typeof UploadExhibitionSchema>
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

    const data = await validateUploadExhibitionSchema(values);

    console.log(data.time);
    const exhibition = await prisma.exhibition.create({
      data,
    });

    return exhibition;
  } catch (error) {
    throw error;
  }
}
