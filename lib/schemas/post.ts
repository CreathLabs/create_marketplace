import * as yup from "yup";
import { YupValidationError } from "../errors";
import { asset } from "./common";

export const PostSchema = yup.object({
  text: yup.string().required("text is required"),
  assets: yup
    .array(asset.required("asset is required"))
    .max(3)
    .required("assets are required"),
});

export const validatePostSchema = async (values: any) => {
  try {
    const data = await PostSchema.validate(values, { abortEarly: false });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};

export const CommentSchema = yup.object({
  text: yup.string().required("text is required"),
});

export const validateCommentSchema = async (values: any) => {
  try {
    const data = await CommentSchema.validate(values, { abortEarly: false });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};
