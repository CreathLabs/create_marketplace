import * as yup from "yup";
import { YupValidationError } from "../errors";

export const UploadExhibitionSchema = yup.object({
  name: yup.string().required("This field is required."),
  description: yup.string().required("This field is required."),
  country: yup.string().required("This field is required."),
  location: yup.string().required("This field is required."),
  address: yup.string().required("This field is required."),
  date: yup.string().required("This field is required."),
  time: yup.string().required("This field is required."),
  artist_name: yup.string().required("This field is required."),
  curator_name: yup.string().required("This field is required."),
  cover_image: yup.string().required("This field is required"),
  images: yup.array(yup.string().required()).optional(),
});

export const validateUploadExhibitionSchema = async (values: any) => {
  try {
    const data = await UploadExhibitionSchema.validate(values, {
      abortEarly: false,
    });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};
