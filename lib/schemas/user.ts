import * as yup from "yup";
import { YupValidationError } from "../errors";
import { asset } from "./common";

export const RegisterSchema = yup.object({
  external_id: yup.string().required("external_id is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const validateRegisterSchema = async (values: any) => {
  try {
    const data = await RegisterSchema.validate(values, { abortEarly: false });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};
