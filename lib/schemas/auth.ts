import * as yup from "yup";
import { YupValidationError } from "../errors";
import { PROFILETYPE } from "@prisma/client";

export const RegisterSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  wallet_address: yup.string(),
  type: yup
    .mixed<PROFILETYPE>()
    .oneOf(Object.values(PROFILETYPE), "Invalid profile type")
    .required("Profile type is required"),
});

export const SignInSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const validateSignInSchema = async (values: any) => {
  try {
    const data = await SignInSchema.validate(values, { abortEarly: false });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};

export const OtpSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  otp: yup.string().required("OTP is required"),
});

export const validateOtpSchema = async (values: any) => {
  try {
    const data = await OtpSchema.validate(values, { abortEarly: false });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};

export const ResetPasswordSchema = yup.object({
  reset_token: yup.string().required("Reset token is required"),
  password: yup.string().required("Password is required"),
});

export const validateResetPasswordSchema = async (values: any) => {
  try {
    const data = await ResetPasswordSchema.validate(values, {
      abortEarly: false,
    });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};

export const validateRegisterSchema = async (values: any) => {
  try {
    const data = await RegisterSchema.validate(values, { abortEarly: false });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};
