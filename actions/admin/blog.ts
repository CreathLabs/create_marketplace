"use server";
import prisma from "@/lib/prisma";
import { currentAdmin, getSession, isAdmin } from "../current";
import { NotAuthorizedError } from "@/lib/errors";
import { InferType } from "yup";
import { UploadBlogSchema, validateUploadBlogSchema } from "@/lib/schemas";

export async function addBlog(values: InferType<typeof UploadBlogSchema>) {
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

    const data = await validateUploadBlogSchema(values);

    const blog = await prisma.blog.create({
      data,
    });

    return blog;
  } catch (error) {
    throw error;
  }
}

export async function updateBlog(
  id: string,
  values: InferType<typeof UploadBlogSchema>
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

    const data = await validateUploadBlogSchema(values);

    const blog = await prisma.blog.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return blog;
  } catch (error) {
    throw error;
  }
}

export async function getAdminBlogs(page = 1, ipp = 10) {
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

    const total = await prisma.blog.count({});

    const data = await prisma.blog.findMany({
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
