import * as yup from "yup";
import { YupValidationError } from "../errors";

export const EditProfileSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  username: yup.string().required("Username is required"),
  wallet_address: yup.string().required("Wallet address is required"),
  bio: yup.string().required("Biography is required"),
  instagram: yup.string(),
  twitter: yup.string(),
  profile_image: yup.string(),
  cover_image: yup.string()
});

export const UploadArtworkSchema = yup.object({
  name: yup.string().required("Name is required."),
  floor_price: yup.number().required("Floor price is required."),
  description: yup.string().required("Description is required."),
  dimensions: yup.string().required("Dimensions is required."),
  category_id: yup.string().required("Medium is required."),
  location: yup.string().required("Location is required"),
  contract: yup.string().optional(),
  art_image: yup.string().required("Art Image is required"),
});

export const validateUploadArtworkSchema = async (values: any) => {
  try {
    const data = await UploadArtworkSchema.validate(values, {
      abortEarly: false,
    });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};

export const validateEditProfileSchema = async (values: any) => {
  try {
    const data = await EditProfileSchema.validate(values, {
      abortEarly: false,
    });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};
