"use server";
import prisma from "@/lib/prisma";

export async function getTopArtists() {
  try {
    const res = await prisma.user.findMany({
      where: {
        is_approved: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: 8,
    });

    return res;
  } catch (error) {
    throw error;
  }
}

export async function getArtists(page = 1, query = "", noPerPage = 15) {
  try {
    const total = await prisma.user.count({
      where: {
        is_approved: true,
        type: "ARTIST",
        ...(query
          ? {
              AND: {
                username: {
                  search: query,
                },
              },
            }
          : {}),
      },
    });
    const data = await prisma.user.findMany({
      where: {
        is_approved: true,
        type: "ARTIST",
        ...(query
          ? {
              AND: {
                username: {
                  search: query,
                },
              },
            }
          : {}),
      },
      orderBy: {
        created_at: "desc",
      },
      take: noPerPage,
      skip: (page - 1) * noPerPage,
    });
    return { total, data, ipp: noPerPage };
  } catch (error) {
    throw error;
  }
}

export async function getGalleries(page = 1, query = "", noPerPage = 6) {
  try {
    const total = await prisma.user.count({
      where: {
        is_approved: true,
        type: "GALLERY",
        ...(query
          ? {
              AND: {
                username: {
                  search: query,
                },
              },
            }
          : {}),
      },
    });
    const data = await prisma.user.findMany({
      where: {
        is_approved: true,
        type: "GALLERY",
        ...(query
          ? {
              AND: {
                username: {
                  search: query,
                },
              },
            }
          : {}),
      },
      include: {
        _count: {
          select: {
            artworks: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: noPerPage,
      skip: (page - 1) * noPerPage,
    });
    return {
      total,
      data: data.map((item) => ({
        id: item.id,
        name: item.username,
        cover_image:
          item.cover_image ||
          `https://api.dicebear.com/9.x/initials/png?seed=${item.username}`,
        artworks_count: item._count.artworks,
      })),
      ipp: noPerPage,
    };
  } catch (error) {
    throw error;
  }
}

export async function getArtist(id: string) {
  try {
    const data = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        artworks: {
          include: {
            _count: {
              select: {
                likes: true,
              },
            },
          },
        },
        likes: {
          include: {
            art: {
              include: {
                _count: {
                  select: {
                    likes: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return {
      ...data,
      artworks: data.artworks.map((art) => ({
        ...art,
        likesCount: art._count.likes,
      })),
      likes: data.likes.map((item) => ({
        ...item.art,
        likesCount: item.art._count.likes,
      })),
    };
  } catch (error) {
    throw error;
  }
}
