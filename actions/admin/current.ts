"use server";
import prisma from "@/lib/prisma";
import { currentAdmin, currentUser, getSession, isAdmin } from "../current";
import { UpdateAdminSchema, validateUpdateAdminSchema } from "@/lib/schemas";
import { InferType } from "yup";
import { BadRequestError, NotAuthorizedError } from "@/lib/errors";
import bcrypt from "bcryptjs";

export async function getAdminProfile() {
  const token = await getSession("admin_token");
  if (!token) {
    return null;
  }
  try {
    const res = await currentUser(token);
    if (!res.id) {
      return null;
    }

    const user = await prisma.admin.findUniqueOrThrow({
      where: {
        id: res.id,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function updateAdminProfile(
  values: InferType<typeof UpdateAdminSchema>
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

    const data = await validateUpdateAdminSchema(values);

    const user = await prisma.admin.findUniqueOrThrow({
      where: {
        id: res.id,
      },
    });

    let hashedPassword = null;

    if (data.password && data.new_password) {
      const isMatch = await bcrypt.compare(data.password, user.password!);

      if (!isMatch) {
        throw new BadRequestError("Invalid password");
      }

      hashedPassword = await bcrypt.hash(data.new_password, 10);
      console.log(hashedPassword);
    }

    const updatedUser = await prisma.admin.update({
      where: {
        id: user.id,
      },
      data: {
        full_name: data.full_name,
        phone_no: data.phone_no,
        profile_image: data.profile_image,
        ...(hashedPassword ? { password: hashedPassword } : {}),
      },
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}
