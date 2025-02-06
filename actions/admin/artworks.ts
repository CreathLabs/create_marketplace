"use server";
import prisma from "@/lib/prisma";
import { currentAdmin, getSession, isAdmin } from "../current";
import { NotAuthorizedError } from "@/lib/errors";
import { Resend } from "resend";
import AdminWelcomeEmail from "@/components/email-templates/AdminWelcome";
import ArtworkApprovedEmail from "@/components/email-templates/ArtApproved";
import ArtworkRejectedEmail from "@/components/email-templates/ArtRejected";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getArtworksStats() {
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

    const artworksCount = await prisma.art.count();

    const artworksSold = 0;

    return {
      collectorsCount,
      artworksCount,
      artworksSold,
    };
  } catch (error) {
    throw error;
  }
}

export async function getAdminArtworks(page = 1, ipp = 10) {
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

    const total = await prisma.art.count({});

    const data = await prisma.art.findMany({
      include: {
        user: true,
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

export async function getAdminArtwork(id: string) {
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

    const data = await prisma.art.findUniqueOrThrow({
      include: {
        category: true,
      },
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function approveArtwork(id: string, nft_id: string) {
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

    await prisma.art.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const data = await prisma.art.update({
      where: {
        id,
      },
      data: {
        is_approved: true,
        nft_id: nft_id,
      },
      include: { user: true },
    });

    const { error } = await resend.emails.send({
      from: "Creath Marketplace <info@trustfynd.com>",
      to: [data?.user?.email],
      subject: "Artwork Approved",
      react: ArtworkApprovedEmail({
        username: data?.user?.username,
        name: data.name,
      }),
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function rejectDeleteArtwork(id: string) {
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

    await prisma.art.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const data = await prisma.art.delete({
      where: {
        id,
      },
      include: { user: true },
    });

    const { error } = await resend.emails.send({
      from: "Creath Marketplace <info@trustfynd.com>",
      to: [data?.user?.email],
      subject: "Artwork Rejected",
      react: ArtworkRejectedEmail({
        username: data?.user?.username,
        name: data.name,
      }),
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}
