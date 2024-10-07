import * as yup from "yup";
import { YupValidationError } from "../errors";

export const UploadBlogSchema = yup.object({
  title: yup.string().required("Title field is required."),
  content: yup.string().required("Content field is required."),
  cover_image: yup.string().required("Cover Image field is required"),
});

export const validateUploadBlogSchema = async (values: any) => {
  try {
    const data = await UploadBlogSchema.validate(values, {
      abortEarly: false,
    });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};
