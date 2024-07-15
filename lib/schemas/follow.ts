import * as yup from "yup";
import { YupValidationError } from "../errors";

export const FollowSchema = yup.object({
  user_id: yup.string().required("user_id is required"),
});

export const validateFollowSchema = async (values: any) => {
  try {
    const data = await FollowSchema.validate(values, { abortEarly: false });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};
