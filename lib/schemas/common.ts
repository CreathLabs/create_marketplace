import * as yup from "yup";

export const asset = yup.object({
  type: yup.string().required("type is required"),
  url: yup.string().required("url is required"),
  content_type: yup.string().required("content_type is required"),
  size: yup.number().required("size is required"),
  public_id: yup.string().required("public_id is required"),
  blur_hash: yup.string(),
});

export const address = yup.object({
  country_id: yup.number().required("country_id is required"),
  state_id: yup.number().required("state_id is required"),
  city_id: yup.number().required("city_id is required"),
  street_line_one: yup.string().required("street_line_one is required"),
  postal_code: yup.string().required("postal_code is required"),
  street_line_two: yup.string(),
});
