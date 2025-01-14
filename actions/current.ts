"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Admin, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NotAuthorizedError } from "@/lib/errors";
import * as yup from "yup";
import {
  EditProfileSchema,
  UploadArtworkSchema,
  validateEditProfileSchema,
  validateUploadArtworkSchema,
} from "@/lib/schemas";
import { Resend } from "resend";
import ArtworkUploadedEmail from "@/components/email-templates/ArtSuccess";

const resend = new Resend(process.env.RESEND_API_KEY);

export const getProfile = async () => {
  const token = await getSession("token");
  if (!token) {
    return null;
  }
  try {
    const res = await currentUser(token);
    if (!res.id) {
      return null;
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: res.id,
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
      ...user,
      artworks: user.artworks.map((art) => ({
        ...art,
        likesCount: art._count.likes,
      })),
      likes: user.likes.map((item) => ({
        ...item.art,
        likesCount: item.art._count.likes,
      })),
    };
  } catch (error) {
    throw error;
  }
};

export const getAllUserLikes = async () => {
  const token = await getSession("token");
  if (!token) {
    return null;
  }
  try {
    const res = await currentUser(token);
    if (!res.id) {
      return null;
    }

    const user = await prisma.likes.findMany({
      where: {
        user_id: res.id,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const getAllUserCollectibleLikes = async () => {
  const token = await getSession("token");
  if (!token) {
    return null;
  }
  try {
    const res = await currentUser(token);
    if (!res.id) {
      return null;
    }

    const user = await prisma.collectibleLikes.findMany({
      where: {
        user_id: res.id,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (
  values: yup.InferType<typeof EditProfileSchema>
) => {
  const token = await getSession("token");

  if (!token) {
    throw new NotAuthorizedError();
  }

  try {
    const res = await currentUser(token);
    if (!res.id) {
      throw new NotAuthorizedError();
    }

    const data = await validateEditProfileSchema(values);

    const user = await prisma.user.update({
      where: {
        id: res.id,
      },
      data: {
        ...data,
        is_approved: true,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const uploadArtWork = async (
  values: yup.InferType<typeof UploadArtworkSchema>
) => {
  const token = await getSession("token");

  if (!token) {
    throw new NotAuthorizedError();
  }

  try {
    const res = await currentUser(token);
    if (!res.id || !res.username) {
      throw new NotAuthorizedError();
    }

    const data = await validateUploadArtworkSchema(values);

    const artwork = await prisma.art.create({
      data: {
        ...data,
        user_id: res.id,
        published_by: res.username,
      },
    });

    const { error } = await resend.emails.send({
      from: "Creath Marketplace <info@trustfynd.com>",
      to: [res.email],
      subject: "Artwork uploaded, pending Approval",
      react: ArtworkUploadedEmail({
        username: res.username,
        name: artwork.name,
      }),
    });

    if (error) {
      throw error;
    }

    return artwork;
  } catch (error) {
    throw error;
  }
};

export const saveSession = async (name: string, value: string) => {
  // Create the session
  const expires = new Date(Date.now());
  expires.setMonth(expires.getMonth() + 1);

  // Save the session in a cookie
  cookies().set(name, value, { expires, httpOnly: true });
};

export const getSession = async (name: string) => {
  const session = cookies().get(name)?.value;
  if (!session) return null;
  return session;
};

export const deleteSession = async (name: string) => {
  const session = cookies().delete(name);
  console.log("Deleted", session);
  return session;
};

export const currentUser = async (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET!) as User;

    return payload;
  } catch (error) {
    throw error;
  }
};

export const currentAdmin = async (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET!) as Admin;

    return payload;
  } catch (error) {
    throw error;
  }
};

export const isAdmin = async (data: Admin) => {
  return !!data.role;
};
