"use server";
import { BadRequestError } from "@/lib/errors";
import prisma from "@/lib/prisma";
import {
  OtpSchema,
  RegisterSchema,
  ResetPasswordSchema,
  SignInSchema,
  validateOtpSchema,
  validateRegisterSchema,
  validateResetPasswordSchema,
  validateSignInSchema,
} from "@/lib/schemas";
import { generateFromEmail } from "unique-username-generator";
import * as yup from "yup";
import bcrypt from "bcryptjs";
import { generateOtp, jwtSignCustomer } from "@/lib/helpers";
import { Resend } from "resend";
import OtpEmailTemplate from "@/components/email-templates/OTP";
import { randomBytes } from "crypto";
import ResetPasswordEmail from "@/components/email-templates/ResetPassword";
import UserWelcome from "@/components/email-templates/UserWelcome";

const { user } = prisma;
const resend = new Resend(process.env.RESEND_API_KEY);

export const createUser = async (
  values: yup.InferType<typeof RegisterSchema>
) => {
  const { email, password, wallet_address, type } = await validateRegisterSchema(values);

  const existingUser = await user.findUnique({ where: { email } });

  if (existingUser) {
    throw new BadRequestError("Email Already exists");
  }

  try {
    const username = generateFromEmail(email, 3);
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otp_expires_in = new Date(Date.now() + 600000);

    const res = await user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        wallet_address,
        otp: hashedOtp,
        otp_expires_in,
        type
      },
    });

    // const { error } = await resend.emails.send({
    //   from: "Creath Marketplace <no-reply@mail.creath.io>",
    //   to: [res.email],
    //   subject: "Verify your Email address",
    //   react: OtpEmailTemplate({ otp }),
    // });

    // if (error) {
    //   throw error;
    // }

    return { res, otp:otp };
  } catch (error) {
    throw error;
  }
};

export const userSignin = async (
  values: yup.InferType<typeof SignInSchema>
) => {
  const { email, password } = await validateSignInSchema(values);

  try {
    const existingUser = await user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new BadRequestError("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password!);

    if (!isMatch) {
      throw new BadRequestError("Invalid email or password");
    }

    if (!existingUser.is_email_verified) {
      await resendOtp(email);
      throw new BadRequestError("Account not verified");
    }

    const token = jwtSignCustomer(existingUser);

    return {
      success: true,
      message: "Sign In Successful",
      data: {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        wallet_address: existingUser.wallet_address,
        token,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (values: yup.InferType<typeof OtpSchema>) => {
  const { email, otp } = await validateOtpSchema(values);

  const existingUser = await user.findUnique({ where: { email } });

  try {
    if (!existingUser) {
      throw new BadRequestError("Invalid email address");
    }

    if (existingUser.is_email_verified) {
      throw new BadRequestError("Account already verified");
    }

    if (!existingUser.otp) {
      throw new BadRequestError("Invalid or Expired Otp");
    }

    if (!existingUser.otp_expires_in) {
      throw new BadRequestError("Invalid or Expired Otp");
    }

    const expires = existingUser.otp_expires_in.getTime();
    const current = Date.now();

    if (expires < current) {
      throw new BadRequestError("Invalid or Expired Otp");
    }

    const isMatch = await bcrypt.compare(otp, existingUser.otp);

    if (!isMatch) {
      throw new BadRequestError("Invalid or Expired Otp");
    }

    const updatedUser = await user.update({
      where: {
        email,
      },
      data: {
        is_email_verified: true,
        otp: null,
        otp_expires_in: null,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    const token = jwtSignCustomer(existingUser);

    const { error } = await resend.emails.send({
      from: "Creath Marketplace <no-reply@mail.creath.io>",
      to: [updatedUser.email],
      subject: "Welcome to Creath",
      react: UserWelcome({ username: updatedUser.username }),
    });
    if (error) {
      throw error;
    }

    return {
      success: true,
      message: "Verification Successful",
      data: {
        ...updatedUser,
        token,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const resendOtp = async (email: string) => {
  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const otp_expires_in = new Date(Date.now() + 600000);

  const res = await user.update({
    where: {
      email,
    },
    data: {
      otp: hashedOtp,
      otp_expires_in,
    },
  });

  const { error } = await resend.emails.send({
    from: "Creath Marketplace <no-reply@mail.creath.io>",
    to: [res.email],
    subject: "Verify your Email address",
    react: OtpEmailTemplate({ otp }),
  });

  if (error) {
    throw error;
  }

  return res;
};

export const forgotPassword = async (email: string, otp: string) => {
  console.log(email);
  const existingUser = await user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw new BadRequestError("Email doesn't exist");
  }

  try {
    if (!existingUser.otp) {
      throw new BadRequestError("Invalid or Expired Otp");
    }

    if (!existingUser.otp_expires_in) {
      throw new BadRequestError("Invalid or Expired Otp");
    }

    const expires = existingUser.otp_expires_in.getTime();
    const current = Date.now();

    if (expires < current) {
      throw new BadRequestError("Invalid or Expired Otp");
    }

    const isMatch = await bcrypt.compare(otp, existingUser.otp);

    if (!isMatch) {
      throw new BadRequestError("Invalid or Expired Otp");
    }

    const token_expies_in = new Date(Date.now() + 300000);
    const reset_token = randomBytes(20).toString("hex");

    const res = await user.update({
      where: {
        email,
      },
      data: {
        otp: null,
        otp_expires_in: null,
        reset_token,
        token_expies_in,
      },
    });

    return {
      success: true,
      message: "Here is your Reset Password token",
      data: res.reset_token,
    };
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (
  values: yup.InferType<typeof ResetPasswordSchema>
) => {
  const { password, reset_token } = await validateResetPasswordSchema(values);

  const existingUser = await user.findUnique({ where: { reset_token } });

  try {
    if (!existingUser) {
      throw new BadRequestError("Invalid or Expired Reset token");
    }

    if (!existingUser.reset_token) {
      throw new BadRequestError("Invalid or Expired Reset token");
    }

    if (!existingUser.token_expies_in) {
      throw new BadRequestError("Invalid or Expired Reset token");
    }

    const expires = existingUser.token_expies_in.getTime();
    const current = Date.now();

    if (expires < current) {
      throw new BadRequestError("Invalid or Expired Reset token");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.update({
      where: {
        reset_token,
      },
      data: {
        password: hashedPassword,
        reset_token: null,
        token_expies_in: null,
      },
    });
    return {
      success: true,
      message: "Password Reset Successful",
    };
  } catch (error) {
    throw error;
  }
};
