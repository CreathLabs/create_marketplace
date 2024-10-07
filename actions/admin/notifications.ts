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

export async function getNotifications(page = 1, ipp = 10) {
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

    const total = await prisma.notification.count({});

    const data = await prisma.notification.findMany({
      include: { user: true },
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
