"use server";
import prisma from "@/lib/prisma";
import { currentAdmin, getSession, isAdmin } from "../current";
import { NotAuthorizedError } from "@/lib/errors";
import { InferType } from "yup";
import {
  UploadExhibitionArtworkSchema,
  UploadExhibitionSchema,
  validateUploadExhibitionArtworkSchema,
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
      include: {
        _count: {
          select: {
            artworks: true,
          },
        },
      },
      skip: (page - 1) * ipp,
      take: ipp,
    });

    return {
      total,
      data: data.map((d) => ({
        ...d,
        count: d._count.artworks,
      })),
      ipp,
    };
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

    const exhibition = await prisma.exhibition.create({
      data,
    });

    return exhibition;
  } catch (error) {
    throw error;
  }
}

export async function updateExhibition(
  id: string,
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

    const exhibition = await prisma.exhibition.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return exhibition;
  } catch (error) {
    throw error;
  }
}

export const uploadExhibitionArtWork = async (
  values: InferType<typeof UploadExhibitionArtworkSchema>
) => {
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
    const data = await validateUploadExhibitionArtworkSchema(values);

    const artwork = await prisma.exhibitionArt.create({
      data: {
        ...data,
      },
    });

    return artwork;
  } catch (error) {
    throw error;
  }
};

export const updateExhibitionArtWork = async (
  values: InferType<typeof UploadExhibitionArtworkSchema>,
  id: string
) => {
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
    const data = await validateUploadExhibitionArtworkSchema(values);

    const artwork = await prisma.exhibitionArt.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return artwork;
  } catch (error) {
    throw error;
  }
};

export async function deleteExhibitionArtWork(id: string) {
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

    await prisma.exhibitionArt.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const data = await prisma.exhibitionArt.delete({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}
