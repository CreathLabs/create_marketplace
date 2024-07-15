import * as yup from "yup";
import { YupValidationError } from "../errors";
import { address, asset } from "./common";

export const ProfileSchema = yup.object({
  first_name: yup.string(),
  last_name: yup.string(),
  type: yup
    .string()
    .required("type is required")
    .oneOf(["profile", "business"])
    .default("profile"),
  dob: yup.string(),
  bio: yup.string(),
  assets: yup.array(asset.required("asset is required")).default([]),

  // Business Part
  location: yup.string(),
  business_name: yup.string(),
  business_email: yup.string(),
  business_type: yup.string(),
  business_reg_no: yup.string(),
  num_of_employees: yup.string(),
  description: yup.string(),
  currency: yup.string(),
  address: address.notRequired().default(null),
});

export const validateProfileSchema = async (values: any) => {
  try {
    const data = await ProfileSchema.validate(values, { abortEarly: false });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};
