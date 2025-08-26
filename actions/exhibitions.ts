"use server";
import prisma from "@/lib/prisma";

export async function getTopExhibitions() {
  try {
    const res = await prisma.exhibition.findMany({
      take: 4,
      include: {
        _count: {
          select: {
            art_pieces: true,
          },
        },
      },
    });
    return res.map((d) => ({
      ...d,
      artworks_count: d._count.art_pieces,
    }));
  } catch (error) {
    throw error;
  }
}

export async function getExhibitions(page = 1, query = "", noPerPage = 6) {
  try {
    const total = await prisma.exhibition.count({
      where: {
        ...(query
          ? {
              AND: {
                name: {
                  search: query,
                },
              },
            }
          : {}),
      },
    });
    const data = await prisma.exhibition.findMany({
      where: {
        ...(query
          ? {
              AND: {
                name: {
                  search: query,
                },
              },
            }
          : {}),
      },
      include: {
        _count: {
          select: {
            art_pieces: true,
          },
        },
      },
      take: noPerPage,
      skip: (page - 1) * noPerPage,
      orderBy: {
        created_at: "desc",
      },
    });
    return {
      total,
      data: data.map((d) => ({
        ...d,
        artworks_count: d._count.art_pieces,
      })),
      ipp: noPerPage,
    };
  } catch (error) {
    throw error;
  }
}

export async function getExhibition(id: string) {
  try {
    const data = await prisma.exhibition.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        artworks: true,
        art_pieces: true,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getExhibitionArtworks(
  id: string
) {
  try {
    const total = await prisma.art.count({
      where: {
        exhibition_id: id,
      },
    });

    const data = await prisma.art.findMany({
      where: {
        exhibition_id: id,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return {
      data
    };
  } catch (error) {
    throw error;
  }
}

export async function getExhibitionArtwork(id: string) {
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
