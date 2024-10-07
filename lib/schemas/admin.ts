import * as yup from "yup";
import { YupValidationError } from "../errors";

export const AdminSchema = yup.object({
  full_name: yup.string().required("Full name field is required."),
  email: yup.string().email().required("Email field is required."),
  phone_no: yup.string().required("Phone No is required."),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  profile_image: yup.string().required("Profile Image field is required"),
});

export const UpdateAdminSchema = yup.object({
  full_name: yup.string().required("Full Name field is required."),
  email: yup.string().email().required("Email field is required."),
  password: yup.string().optional(),
  new_password: yup.string().optional(),
  phone_no: yup.string().required("Phone No field is required."),
  profile_image: yup.string().required("Profile Image field is required"),
});

export const validateUpdateAdminSchema = async (values: any) => {
  try {
    const data = await UpdateAdminSchema.validate(values, {
      abortEarly: false,
    });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};

export const validateAdminSchema = async (values: any) => {
  try {
    const data = await AdminSchema.validate(values, {
      abortEarly: false,
    });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};
