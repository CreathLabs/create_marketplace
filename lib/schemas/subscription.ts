import * as yup from "yup";
import { YupValidationError } from "../errors";

export const SubscriptionSchema = yup.object({
  plan_id: yup.string().required("plan_id is required"),
  callback_url: yup.string().required("callback_url is required"),
});

export const validateSubscriptionSchema = async (values: any) => {
  try {
    const data = await SubscriptionSchema.validate(values, {
      abortEarly: false,
    });

    return data;
  } catch (error: any) {
    const err = error as yup.ValidationError;
    throw new YupValidationError(err);
  }
};
