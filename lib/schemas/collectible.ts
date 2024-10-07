import * as yup from "yup";
import { YupValidationError } from "../errors";

export const UploadCollectibleSchema = yup.object({
  name: yup.string().required("Name field is required."),
  mint_price: yup.number().required("Mint Price field is required."),
  mint_per_wallet: yup.number().required("Mint Per Wallet field is required."),
  total_minted: yup.number().required("Total Minted field is required."),
  total_unminted: yup.number().required("Total Unminted field is required."),
  description: yup.string().required("Description field is required."),
  published_by: yup.string().required("Published by field is required."),
  contract: yup.string().optional(),
  image: yup.string().required("Image field is required"),
});

export const validateUploadCollectibleSchema = async (values: any) => {
  try {
    const data = await UploadCollectibleSchema.validate(values, {
      abortEarly: false,
    });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};
