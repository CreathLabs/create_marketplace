"use server";
import prisma from "@/lib/prisma";
import { currentAdmin, getSession, isAdmin } from "../current";
import { NotAuthorizedError } from "@/lib/errors";
import { InferType } from "yup";
import { AdminSchema, validateAdminSchema } from "@/lib/schemas";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import AdminWelcomeEmail from "@/components/email-templates/AdminWelcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function addAdmin(values: InferType<typeof AdminSchema>) {
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

    const data = await validateAdminSchema(values);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const admin = await prisma.admin.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const { error } = await resend.emails.send({
      from: "Creath Marketplace <info@trustfynd.com>",
      to: [data.email],
      subject: "You are now an Admin!",
      react: AdminWelcomeEmail({
        adminName: admin.full_name,
        adminEmail: admin.email,
        adminPassword: data.password,
      }),
    });

    if (error) {
      throw error;
    }

    return admin;
  } catch (error) {
    throw error;
  }
}

export async function getAdmins(page = 1, ipp = 10) {
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

    const total = await prisma.admin.count({});

    const data = await prisma.admin.findMany({
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
