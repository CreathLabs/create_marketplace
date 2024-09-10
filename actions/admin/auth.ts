"use server";
import { BadRequestError } from "@/lib/errors";
import prisma from "@/lib/prisma";
import { SignInSchema, validateSignInSchema } from "@/lib/schemas";
import * as yup from "yup";
import bcrypt from "bcryptjs";
import { jwtSignAdmin } from "@/lib/helpers";

const { admin } = prisma;

export const adminSignin = async (
  values: yup.InferType<typeof SignInSchema>
) => {
  const { email, password } = await validateSignInSchema(values);

  try {
    const existingAdmin = await admin.findUnique({
      where: {
        email,
      },
    });

    if (!existingAdmin) {
      throw new BadRequestError("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, existingAdmin.password!);

    if (!isMatch) {
      throw new BadRequestError("Invalid email or password");
    }

    const token = jwtSignAdmin(existingAdmin);

    return {
      success: true,
      message: "Sign In Successful",
      data: {
        id: existingAdmin.id,
        email: existingAdmin.email,
        full_name: existingAdmin.full_name,
        token,
      },
    };
  } catch (error) {
    throw error;
  }
};
