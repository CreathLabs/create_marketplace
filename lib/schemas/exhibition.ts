import * as yup from "yup";
import { YupValidationError } from "../errors";

export const UploadExhibitionSchema = yup.object({
  name: yup.string().required("This field is required."),
  description: yup.string().required("This field is required."),
  country: yup.string().required("This field is required."),
  location: yup.string().required("This field is required."),
  address: yup.string().required("This field is required."),
  nft_address: yup.string().required("This field is required."),
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

export const UploadExhibitionArtworkSchema = yup.object({
  name: yup.string().required("Name is required."),
  floor_price: yup.number().required("Floor price is required."),
  description: yup.string().required("Description is required."),
  dimensions: yup.string().required("Dimensions is required."),
  category_id: yup.string().required("Medium is required."),
  art_image: yup.string().required("Art Image is required"),
  exhibition_id: yup.string().required("Medium is required."),
});

export const validateUploadExhibitionArtworkSchema = async (values: any) => {
  try {
    const data = await UploadExhibitionArtworkSchema.validate(values, {
      abortEarly: false,
    });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};
